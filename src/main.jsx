import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Menu, X, Search, MapPin, CalendarDays, Users, ArrowRight, Heart,
  Star, Clock3, Plane, Compass, ShieldCheck, Headphones, Instagram,
  Facebook, Twitter, ChevronDown, CheckCircle2, Mail, Sparkles
} from "lucide-react";
import "./styles.css";

const destinations = [
  { id: 1, name: "Bali, Indonesia", country: "Indonesia", category: "Beach", days: "6 days / 5 nights", price: 42999, rating: "4.9", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85", tag: "Bestseller", description: "Tropical temples, emerald rice terraces and dreamy sunsets." },
  { id: 2, name: "Dubai, UAE", country: "United Arab Emirates", category: "City", days: "4 days / 3 nights", price: 35999, rating: "4.8", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85", tag: "Popular", description: "Skyline views, desert adventures and unforgettable experiences." },
  { id: 3, name: "Swiss Alps", country: "Switzerland", category: "Mountains", days: "7 days / 6 nights", price: 89999, rating: "5.0", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=85", tag: "Dream trip", description: "Snow-capped peaks, scenic railways and storybook villages." },
  { id: 4, name: "Kerala, India", country: "India", category: "Nature", days: "5 days / 4 nights", price: 24999, rating: "4.8", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85", tag: "Great value", description: "Quiet backwaters, lush greenery and warm local hospitality." },
  { id: 5, name: "Jaipur, India", country: "India", category: "Culture", days: "3 days / 2 nights", price: 12999, rating: "4.7", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=85", tag: "Culture pick", description: "Royal palaces, colourful bazaars and rich Rajasthani cuisine." },
  { id: 6, name: "Maldives", country: "Maldives", category: "Beach", days: "5 days / 4 nights", price: 69999, rating: "4.9", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85", tag: "Romantic", description: "Turquoise lagoons, overwater villas and slow island days." }
];

const money = (n) => "₹" + n.toLocaleString("en-IN");

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("Any budget");
  const [category, setCategory] = useState("All trips");
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [booking, setBooking] = useState(null);
  const [notice, setNotice] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("2 travellers");

  const filtered = useMemo(() => destinations.filter((d) => {
    const matchesQuery = `${d.name} ${d.country} ${d.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All trips" || d.category === category;
    const matchesBudget = budget === "Any budget" || (budget === "Under ₹30,000" && d.price < 30000) || (budget === "₹30,000–₹60,000" && d.price >= 30000 && d.price <= 60000) || (budget === "Above ₹60,000" && d.price > 60000);
    return matchesQuery && matchesCategory && matchesBudget;
  }), [query, budget, category]);

  const toggleFavorite = (id) => setFavorites((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]);
  const showNotice = (message) => { setNotice(message); window.setTimeout(() => setNotice(""), 3500); };
  const scrollToTrips = () => { document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  function submitSearch(e) {
    e.preventDefault();
    scrollToTrips();
  }

  function submitBooking(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    setBooking(null);
    setSelected(null);
    showNotice(`Thanks, ${name}! Your demo booking request has been received. No payment was taken.`);
  }

  function submitNewsletter(e) {
    e.preventDefault();
    if (!newsletter.includes("@") || !newsletter.includes(".")) return showNotice("Please enter a valid email address.");
    setNewsletterDone(true);
    setNewsletter("");
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#home" className="brand" aria-label="WanderWise home"><span className="brand-mark"><Compass size={21}/></span><span>wander<span>wise</span></span></a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a>
          <a href="#why-us" onClick={() => setMenuOpen(false)}>Why WanderWise</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
        </nav>
        <button className="btn btn-dark header-cta" onClick={scrollToTrips}>Explore trips <ArrowRight size={16}/></button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image"></div>
          <div className="hero-shade"></div>
          <div className="hero-content">
            <div className="eyebrow light"><Sparkles size={15}/> YOUR NEXT CHAPTER STARTS HERE</div>
            <h1>Collect moments.<br/><em>Not just miles.</em></h1>
            <p>Thoughtfully planned getaways for curious travellers. Find the trip that feels like you.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={scrollToTrips}>Explore destinations <ArrowRight size={17}/></button>
              <a href="#why-us" className="text-link light-link">Discover our story <span>↗</span></a>
            </div>
            <div className="hero-proof"><div className="avatar-stack"><span>R</span><span>A</span><span>M</span><span>S</span></div><div><strong>Loved by 12,000+ travellers</strong><small><Star size={13} fill="currentColor"/> 4.9/5 average trip rating</small></div></div>
          </div>
          <div className="hero-note"><span className="note-icon"><Plane size={18}/></span><div><strong>Somewhere wonderful</strong><small>is closer than you think.</small></div></div>
        </section>

        <section className="search-wrap" aria-label="Search trips">
          <form className="search-panel" onSubmit={submitSearch}>
            <label className="search-field destination-field"><span className="field-icon"><MapPin size={19}/></span><span className="field-copy"><small>WHERE TO?</small><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search destinations"/></span></label>
            <label className="search-field"><span className="field-icon"><CalendarDays size={19}/></span><span className="field-copy"><small>WHEN?</small><input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} aria-label="Travel date"/></span></label>
            <label className="search-field"><span className="field-icon"><Users size={19}/></span><span className="field-copy"><small>WHO'S GOING?</small><select value={travelers} onChange={(e) => setTravelers(e.target.value)}><option>1 traveller</option><option>2 travellers</option><option>3 travellers</option><option>4 travellers</option><option>5+ travellers</option></select></span></label>
            <button className="btn btn-primary search-button" type="submit"><Search size={18}/> Find my trip</button>
          </form>
        </section>

        <section className="section destinations-section" id="destinations">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-dot"></span> HANDPICKED FOR YOU</div><h2>Places that stay<br/><em>with you.</em></h2></div>
            <p>From slow mornings by the sea to mountain air that clears your head — your kind of escape is waiting.</p>
          </div>
          <div className="filter-row">
            <div className="category-pills">{["All trips", "Beach", "Mountains", "City", "Nature", "Culture"].map((c) => <button key={c} className={category === c ? "pill active" : "pill"} onClick={() => setCategory(c)}>{c}</button>)}</div>
            <label className="budget-select"><span>Budget</span><select value={budget} onChange={(e) => setBudget(e.target.value)}><option>Any budget</option><option>Under ₹30,000</option><option>₹30,000–₹60,000</option><option>Above ₹60,000</option></select><ChevronDown size={15}/></label>
          </div>
          <div className="destination-grid">
            {filtered.map((d) => <article className="destination-card" key={d.id}>
              <div className="card-image-wrap"><img src={d.image} alt={d.name} loading="lazy"/><span className="card-tag">{d.tag}</span><button className={favorites.includes(d.id) ? "favorite-button favorited" : "favorite-button"} onClick={() => toggleFavorite(d.id)} aria-label={favorites.includes(d.id) ? "Remove from wishlist" : "Add to wishlist"}><Heart size={18} fill={favorites.includes(d.id) ? "currentColor" : "none"}/></button></div>
              <div className="card-body"><div className="card-meta"><span><MapPin size={13}/>{d.country}</span><span className="rating"><Star size={13} fill="currentColor"/>{d.rating}</span></div><h3>{d.name}</h3><p>{d.description}</p><div className="card-bottom"><div><small>Starting from</small><strong>{money(d.price)}<small> / person</small></strong></div><button className="round-arrow" onClick={() => setSelected(d)} aria-label={`View ${d.name} details`}><ArrowRight size={19}/></button></div><div className="trip-duration"><Clock3 size={14}/>{d.days}</div></div>
            </article>)}
          </div>
          {filtered.length === 0 && <div className="empty-state"><Search size={28}/><h3>No trips found</h3><p>Try another destination, category or budget.</p><button className="btn btn-dark" onClick={() => {setQuery("");setCategory("All trips");setBudget("Any budget");}}>Clear filters</button></div>}
          <div className="center-action"><span>{filtered.length} thoughtfully planned trips</span><button className="text-link" onClick={() => {setQuery("");setCategory("All trips");setBudget("Any budget");}}>View all destinations <ArrowRight size={16}/></button></div>
        </section>

        <section className="why-section" id="why-us">
          <div className="why-photo"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85" alt="Beautiful alpine lake and mountains" loading="lazy"/><div className="photo-caption"><span><Sparkles size={15}/></span><div><strong>Travel, thoughtfully.</strong><small>Little details. Big memories.</small></div></div></div>
          <div className="why-copy"><div className="eyebrow"><span className="eyebrow-dot"></span> THE WANDERWISE WAY</div><h2>More than a trip.<br/><em>A feeling.</em></h2><p>We believe the best journeys aren't about ticking places off a list. They're about the people you meet, the stories you bring home, and the little moments you never planned.</p>
            <div className="benefit-list"><div className="benefit"><span><ShieldCheck size={20}/></span><div><strong>Thoughtfully picked</strong><p>Trips designed with care, comfort and local character.</p></div></div><div className="benefit"><span><Heart size={20}/></span><div><strong>Made for your kind of travel</strong><p>Flexible ideas for solo explorers, couples and families.</p></div></div><div className="benefit"><span><Headphones size={20}/></span><div><strong>Here when you need us</strong><p>A friendly team to help you plan with confidence.</p></div></div></div>
            <button className="btn btn-dark" onClick={() => showNotice("Our travel story is coming soon. Thanks for your curiosity!")}>Get to know us <ArrowRight size={16}/></button>
          </div>
        </section>

        <section className="quote-section" id="reviews"><div className="quote-mark">“</div><div className="eyebrow light">KIND WORDS, REAL MEMORIES</div><h2>“We came back with a camera full of photos<br className="desktop-break"/> and a heart full of stories.”</h2><div className="review-stars">★★★★★</div><strong>Priya & Arjun</strong><small>Bali, Indonesia · travelled with WanderWise</small><div className="quote-count"><span></span><span className="selected"></span><span></span></div></section>

        <section className="newsletter-section"><div className="newsletter-icon"><Mail size={22}/></div><div className="newsletter-copy"><div className="eyebrow"><span className="eyebrow-dot"></span> A LITTLE WANDERLUST</div><h2>Good trips. Great stories.<br/><em>Inbox only occasionally.</em></h2><p>Get destination inspiration and thoughtful travel ideas, minus the noise.</p></div><form className="newsletter-form" onSubmit={submitNewsletter}>{newsletterDone ? <div className="success-message"><CheckCircle2 size={19}/> You're on the list. See you out there!</div> : <><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" value={newsletter} onChange={(e) => setNewsletter(e.target.value)}/><button className="btn btn-primary" type="submit">Count me in <ArrowRight size={16}/></button><small>By subscribing, you agree to receive occasional travel emails.</small></>}</form></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><a href="#home" className="brand footer-logo"><span className="brand-mark"><Compass size={21}/></span><span>wander<span>wise</span></span></a><p>For curious travellers, big dreamers<br/>and the stories waiting to happen.</p><div className="social-links"><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={17}/></a><a href="https://www.facebook.com/" aria-label="Facebook"><Facebook size={17}/></a><a href="https://www.twitter.com/" aria-label="Twitter"><Twitter size={17}/></a></div></div><div className="footer-column"><strong>Explore</strong><a href="#destinations">Destinations</a><a href="#why-us">Our story</a><a href="#reviews">Traveller stories</a></div><div className="footer-column"><strong>Plan your trip</strong><a href="#destinations">Find a getaway</a><a href="#destinations">Travel inspiration</a><a href="#why-us">Why WanderWise</a></div><div className="footer-column"><strong>Need a hand?</strong><a href="mailto:hello@wanderwise.example">Contact us</a><a href="#newsletter-email">Join our newsletter</a><span>Made with curiosity ✦</span></div></div><div className="footer-bottom"><div><span>© 2026 WanderWise Travel. All rights reserved.</span><span className="developer-credit">Project Developed By: Nidhi Yadav</span></div><span className="footer-tagline">Made for curious travellers ✦</span></div></footer>

      {notice && <div className="toast" role="status"><CheckCircle2 size={18}/>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15}/></button></div>}

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="package-title" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X/></button><img className="modal-image" src={selected.image} alt={selected.name}/><div className="modal-content"><div className="eyebrow"><span className="eyebrow-dot"></span> YOUR NEXT ADVENTURE</div><h2 id="package-title">{selected.name}</h2><p>{selected.description}</p><div className="modal-facts"><span><Clock3 size={16}/>{selected.days}</span><span><Star size={16} fill="currentColor"/>{selected.rating} guest rating</span></div><div className="modal-price"><div><small>Starting from / person</small><strong>{money(selected.price)}</strong></div><button className="btn btn-primary" onClick={() => {setBooking(selected);setSelected(null);}}>Request to book <ArrowRight size={16}/></button></div><small className="demo-note">Demo package price for project presentation. Availability is not live.</small></div></section></div>}

      {booking && <div className="modal-backdrop" onClick={() => setBooking(null)}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setBooking(null)} aria-label="Close"><X/></button><div className="eyebrow"><span className="eyebrow-dot"></span> LET'S MAKE IT HAPPEN</div><h2 id="booking-title">Your trip to {booking.name}</h2><p>Share a few details and we'll save your demo request.</p><form className="booking-form" onSubmit={submitBooking}><label>Full name<input name="name" required placeholder="Enter your name"/></label><label>Email address<input name="email" type="email" required placeholder="you@example.com"/></label><div className="booking-row"><label>Travel date<input name="date" type="date" required min={new Date().toISOString().slice(0,10)}/></label><label>Travellers<select name="travellers"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5+</option></select></label></div><div className="booking-total"><span>Package starting price</span><strong>{money(booking.price)} / person</strong></div><button className="btn btn-primary full-width" type="submit">Send booking request <ArrowRight size={16}/></button><small className="demo-note">Frontend demo only — no real reservation or payment is made.</small></form></section></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
