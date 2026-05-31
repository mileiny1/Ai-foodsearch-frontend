import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { searchRestaurants } from '../services/authService';
import './search.css';
const GEOCODE_API_URL = 'https://nominatim.openstreetmap.org/search';
 
function extractRestaurantName(item, index) {
  return (
    item.name ||
    item.restaurant_name ||
    item.business_name ||
    item.title ||
    item.place_name ||
    item.display_name ||
    `Restaurant ${index + 1}`
  );
}
 
function extractCity(item) {
  const directCity = item.city || item.locality || item.town || item.village || item.municipality;
  if (directCity) return directCity;
 
  const addressText =
    item.address || item.formatted_address || item.location?.address || item.vicinity || '';
  if (typeof addressText !== 'string' || !addressText.includes(','))
    return 'City unavailable';
 
  const parts = addressText
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
 
  return parts.length >= 2 ? parts[parts.length - 2] : parts[0] || 'City unavailable';
}
 
function findRestaurantArray(data) {
  if (Array.isArray(data)) return data;
 
  const candidates = [
    data?.results, data?.restaurants, data?.data,
    data?.items, data?.matches, data?.payload,
  ];
 
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
    if (candidate && typeof candidate === 'object') {
      const nested = findRestaurantArray(candidate);
      if (nested.length > 0) return nested;
    }
  }
 
  return [];
}
 
function normalizeRestaurantResults(data) {
  return findRestaurantArray(data).map((item, index) => ({
    id: item.id || item.place_id || `${extractRestaurantName(item, index)}-${index}`,
    name: extractRestaurantName(item, index),
    cuisine: item.cuisine || item.category || 'Unknown cuisine',
    rating: typeof item.rating === 'number' ? item.rating : Number(item.rating || item.avg_rating || 0),
    address: item.address || item.formatted_address || item.location?.address || item.vicinity || 'Address unavailable',
    city: extractCity(item),
    phone: item.phone || item.phone_number || 'N/A',
    is_open_now:
      typeof item.is_open_now === 'boolean'
        ? item.is_open_now
        : typeof item.open_now === 'boolean'
          ? item.open_now
          : false,
    hours: item.hours || item.opening_hours || 'Hours unavailable',
  }));
}
 
const Search = () => {
  const [query, setQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radiusM, setRadiusM] = useState('3000');
  const [limit, setLimit] = useState('10');
  const [minRating, setMinRating] = useState('4.2');
  const [openNow, setOpenNow] = useState(true);
  const [priceRange, setPriceRange] = useState(['1', '2']);
  const [restaurants, setRestaurants] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const trimmed = locationQuery.trim();
    if (trimmed.length < 3) return;
 
    const timeoutId = setTimeout(async () => {
      setIsGeocoding(true);
      try {
        const response = await fetch(
          `${GEOCODE_API_URL}?format=jsonv2&addressdetails=1&limit=6&q=${encodeURIComponent(trimmed)}`
        );
        const data = await response.json();
        setPlaces(Array.isArray(data) ? data : []);
      } catch {
        setPlaces([]);
      } finally {
        setIsGeocoding(false);
      }
    }, 400);
 
    return () => clearTimeout(timeoutId);
  }, [locationQuery]);
 
  const handlePlaceSelect = (e) => {
    const idx = e.target.value;
    setSelectedPlaceIndex(idx);
    if (idx === '') { setLat(''); setLng(''); return; }
    const place = places[Number(idx)];
    if (!place) { setLat(''); setLng(''); return; }
    setLat(place.lat);
    setLng(place.lon);
    setLocationQuery(place.display_name || locationQuery);
  };
 
  const handlePriceRangeChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setPriceRange(selected);
  };
 
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setHasSearched(true);
 
    if (!localStorage.getItem('token')) {
      setError('Please log in before searching restaurants.');
      return;
    }
    if (!query.trim()) {
      setError('Please enter a search term, such as pizza.');
      return;
    }
    if (!lat || !lng) {
      setError('Please choose a place from the dropdown to auto-fill latitude and longitude.');
      return;
    }
 
    const payload = {
      query: query.trim(),
      lat: Number(lat),
      lng: Number(lng),
      radius_m: Number(radiusM),
      limit: Number(limit),
      min_rating: Number(minRating),
      open_now: openNow,
      price_range: priceRange.map(Number).sort((a, b) => a - b),
    };
 
    setIsLoading(true);
    try {
      const data = await searchRestaurants(payload);
      setRestaurants(normalizeRestaurantResults(data));
    } catch (err) {
      setRestaurants([]);
      setError(err?.detail || err?.message || 'Search failed. Check backend connection and payload format.');
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="search-page">
 
      {/* Topbar */}
      <div className="search-topbar">
        <div className="search-brand">
          <div className="search-brand-icon" aria-hidden="true">🍽</div>
          <span className="search-brand-name">AI FoodSearch</span>
        </div>
        <div className="user-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          My Account
        </div>
      </div>
 
      {/* Search panel */}
      <form onSubmit={handleSearch} className="search-panel">
        <p className="panel-label">Find restaurants</p>
 
        <div className="s-field-row two">
          <div className="s-field">
            <label htmlFor="query">What are you craving?</label>
            <input
              id="query"
              type="text"
              placeholder="e.g. pizza, sushi, tacos…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="s-field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Type city or address…"
              value={locationQuery}
              onChange={(e) => {
                setLocationQuery(e.target.value);
                if (e.target.value.trim().length < 3) setPlaces([]);
                setSelectedPlaceIndex('');
                setLat('');
                setLng('');
              }}
            />
          </div>
        </div>
 
        <div className="s-field-row one">
          <div className="s-field">
            <label htmlFor="place-select">Select a place</label>
            <select id="place-select" value={selectedPlaceIndex} onChange={handlePlaceSelect}>
              <option value="">
                {isGeocoding ? 'Finding places…' : 'Choose a location to auto-fill coordinates'}
              </option>
              {places.map((place, index) => (
                <option key={place.place_id || `${place.display_name}-${index}`} value={String(index)}>
                  {place.display_name}
                </option>
              ))}
            </select>
          </div>
        </div>
 
        <div className="s-field-row two">
          <div className="s-field">
            <label>Latitude</label>
            <input type="text" readOnly value={lat} placeholder="Auto-filled" />
          </div>
          <div className="s-field">
            <label>Longitude</label>
            <input type="text" readOnly value={lng} placeholder="Auto-filled" />
          </div>
        </div>
 
        <div className="s-divider">
          <div className="s-divider-line" />
          <span className="s-divider-text">Filters</span>
          <div className="s-divider-line" />
        </div>
 
        <div className="s-field-row three">
          <div className="s-field">
            <label htmlFor="radius">Radius (m)</label>
            <input
              id="radius"
              type="number"
              min="100"
              step="100"
              value={radiusM}
              onChange={(e) => setRadiusM(e.target.value)}
            />
          </div>
          <div className="s-field">
            <label htmlFor="limit">Limit</label>
            <input
              id="limit"
              type="number"
              min="1"
              max="50"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
          <div className="s-field">
            <label htmlFor="min-rating">Min rating</label>
            <input
              id="min-rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
          </div>
        </div>
 
        <div className="s-field-row two">
          <div className="s-field">
            <label htmlFor="price-range">Price range</label>
            <select
              id="price-range"
              multiple
              value={priceRange}
              onChange={handlePriceRangeChange}
            >
              <option value="1">Dishes $10–$200</option>
            </select>
          </div>
          <div className="s-field">
            <label>Availability</label>
            <div className="toggle-row">
              <span className="toggle-label">Open now only</span>
              <label className="toggle-switch" aria-label="Open now toggle">
                <input
                  type="checkbox"
                  checked={openNow}
                  onChange={(e) => setOpenNow(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>
 
        <button type="submit" className="btn-search" disabled={isLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          {isLoading ? 'Searching…' : 'Search restaurants'}
        </button>
      </form>
 
      {/* Error */}
      {error && (
        <div className="error-bar" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}
 
      {/* Results */}
      {hasSearched ? (
        <>
          <div className="results-header">
            <span className="results-title">Nearby results</span>
            <span className="results-count">
              {isLoading ? 'Searching…' : `${restaurants.length} found`}
            </span>
          </div>
 
          {restaurants.length === 0 && !isLoading ? (
            <div className="empty-state">
              <p>No restaurants found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="results-grid">
              {restaurants.map((r) => (
                <div key={r.id} className="rest-card">
                  <div className="rest-card-top">
                    <span className="rest-name">{r.name}</span>
                    <span className="rating-pill">★ {r.rating.toFixed(1)}</span>
                  </div>
                  <span className="cuisine-tag">{r.cuisine}</span>
                  <div className="rest-meta">
                    <span className="rest-meta-row">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {r.city}
                    </span>
                    <span className="rest-meta-row">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.06z"/></svg>
                      {r.phone}
                    </span>
                    <span className="rest-meta-row rest-address">{r.address}</span>
                  </div>
                  <div className="rest-card-footer">
                    <span className={`open-badge ${r.is_open_now ? 'open' : 'closed'}`}>
                      <span className="open-dot" />
                      {r.is_open_now ? 'Open now' : 'Closed'}
                    </span>
                    <span className="rest-hours">{r.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p>Enter a search term and location, then press Search.</p>
        </div>
      )}
 
      {/* Footer */}
      <footer className="search-footer">
        <p>© {new Date().getFullYear()} Mileiny Nolasco</p>
        <div className="footer-links">
          <a href="mailto:support@foodsearch.com">support@foodsearch.com</a>
          <a href="tel:3471234567">(347) 123-4567</a>
        </div>
      </footer>
 
    </div>
  );
};
 
export default Search;