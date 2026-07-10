import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { BookingDialog } from "@/components/BookingDialog";
import {
  ShieldCheck, Camera, Wifi, Eye, Headphones, Wrench,
  Phone, Mail, MapPin, Star, CheckCircle2, ArrowRight, Clock,
} from "lucide-react";
import logoUrl from "@/assets/ismart-logo.png";
import heroImg from "@/assets/hero-camera.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iSmart Security — Smart CCTV Installation & 24/7 Monitoring" },
      { name: "description", content: "Professional CCTV installation for homes and businesses. HD cameras, remote viewing, expert installation. Book your free on-site survey today." },
      { property: "og:title", content: "iSmart Security — Smart CCTV Installation" },
      { property: "og:description", content: "Professional CCTV installation for homes and businesses. Book a free on-site survey." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "iSmart Security",
        description: "CCTV installation, smart surveillance and 24/7 monitoring.",
        priceRange: "$$",
        telephone: "+44-7961-297155",
      }),
    }],
  }),
  component: Home,
});

const services = [
  { icon: Camera, title: "HD & 4K CCTV", desc: "Crystal-clear day and night footage with advanced low-light sensors." },
  { icon: Wifi, title: "Smart & Remote View", desc: "Watch your property live from any phone, tablet or desktop." },
  { icon: Eye, title: "AI Motion Alerts", desc: "Real-time alerts that tell people apart from passing cars and pets." },
  { icon: Headphones, title: "24/7 Monitoring", desc: "Optional pro monitoring with rapid response on critical events." },
  { icon: Wrench, title: "Expert Installation", desc: "Tidy cabling, weather-sealed mounts, and a tested system before we leave." },
  { icon: ShieldCheck, title: "Technical Support", desc: "Free remote support and discounted upgrades whenever you need them." },
];

const stats = [
  { n: "12+", l: "Years protecting properties" },
  { n: "3,200", l: "Cameras installed" },
  { n: "4.9★", l: "Average client rating" },
  { n: "24/7", l: "Support & monitoring" },
];

const reviews = [
  { name: "Steve W.", role: "Homeowner, Birmingham", rating: 5, text: "Had four cameras and a video doorbell fitted. Engineer turned up on time, kept everything tidy and set the app up on both our phones before he left. Really pleased with it." },
  { name: "Rachel D.", role: "Shop owner, Manchester", rating: 4, text: "Good service overall. Getting booked in took a bit longer than I'd hoped, but the install itself was quick and the picture quality is excellent. Would use them again." },
  { name: "Imran P.", role: "Warehouse manager, Luton", rating: 5, text: "CCTV and an intruder alarm fitted across our unit. Fair price, neat cabling, and they came back the next week to adjust a camera angle without any fuss." },
];

function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />

      {/* Nav */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "bg-background/85 backdrop-blur-md shadow-sm text-foreground" : "bg-transparent text-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2">
            <img src={logoUrl} alt="iSmart Security" className={`h-14 w-auto transition ${scrolled ? "" : "brightness-0 invert"}`} />
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#services" className="hover:text-brand-red transition">Services</a>
            <a href="#why" className="hover:text-brand-red transition">Why us</a>
            <a href="#reviews" className="hover:text-brand-red transition">Reviews</a>
            <a href="#contact" className="hover:text-brand-red transition">Contact</a>
          </nav>
          <BookingDialog
            trigger={
              <Button className="bg-accent text-accent-foreground hover:bg-brand-red-deep">
                Book now
              </Button>
            }
          />
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] overflow-hidden">
        <img
          src={heroImg}
          alt="CCTV dome camera at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/95 via-brand-navy-deep/80 to-brand-navy-deep/30" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-28 pb-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-red" />
            Trusted security specialists since 2014
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
            See everything.{" "}
            <span className="italic text-white/70">Miss nothing.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Smart CCTV, fire alarms, intruder alarms and data cabling — professionally installed
            and supported, keeping homes, shops and warehouses safe around the clock.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <BookingDialog
              trigger={
                <Button size="lg" className="h-12 bg-accent px-7 text-base text-accent-foreground shadow-glow hover:bg-brand-red-deep">
                  Book a free site survey
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              }
            />
            <a href="#services" className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
              See what we install <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
            {["Free on-site quote", "Same-week installation", "2-year workmanship warranty"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-red" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="text-4xl text-brand-navy md:text-5xl">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-widest text-brand-red">What we install</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Complete security, built around your property.</h2>
          <p className="mt-4 text-muted-foreground">
            From a single front-door camera to multi-site surveillance — we design, install and support every system.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-navy text-primary-foreground transition group-hover:bg-brand-red">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section id="why" className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/80">Why iSmart</p>
            <h2 className="mt-3 text-4xl text-white md:text-5xl">
              Engineered protection.{" "}
              <span className="italic text-white/70">Personal service.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/75">
              We're not a call-centre franchise. Every survey, install and support call is handled by our own
              certified technicians — the same faces, every visit.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Certified, background-checked engineers",
                "Honest assessments — we recommend only what you need",
                "Premium-grade Hikvision & Dahua hardware",
                "GDPR-compliant data handling and storage",
              ].map((t) => (
                <div key={t} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red" />
                  <p className="text-white/90">{t}</p>
                </div>
              ))}
            </div>
            <BookingDialog
              trigger={
                <Button size="lg" className="mt-9 h-12 bg-accent px-7 text-accent-foreground hover:bg-brand-red-deep">
                  Get my free quote <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Clock, t: "Same-week install", d: "Most jobs booked within 5 days." },
              { icon: ShieldCheck, t: "Warranty included", d: "All equipment comes with a warranty." },
              { icon: Eye, t: "Live remote view", d: "All systems include the mobile app." },
              { icon: Headphones, t: "UK-based support", d: "Real humans, 7 days a week." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <f.icon className="h-7 w-7 text-brand-red" />
                <div className="mt-4 text-lg text-white">{f.t}</div>
                <p className="mt-1 text-sm text-white/70">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-7xl px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-widest text-brand-red">What clients say</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Rated 9.8 out of 10 on Checkatrade.</h2>
          <p className="mt-4 text-muted-foreground">
            Checkatrade Trusted — over 150 verified customer reviews.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="flex gap-1 text-brand-red">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-current" : "text-muted-foreground/40"}`} />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground/90">"{r.text}"</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <div className="font-medium text-brand-navy">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2">
          <div>
            <h2 className="text-4xl md:text-5xl">
              Ready to feel <span className="text-gradient-brand italic">safer at home?</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Book a free, no-obligation on-site survey. We'll walk your property, recommend the right
              setup, and send a clear, fixed-price quote within 24 hours.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <a href="tel:07961297155" className="flex items-center gap-3 hover:text-brand-red">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-primary-foreground">
                  <Phone className="h-4 w-4" />
                </span>
                07961 297155
              </a>
              <a href="mailto:info@ismartsecurity.co.uk" className="flex items-center gap-3 hover:text-brand-red">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-primary-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                info@ismartsecurity.co.uk
              </a>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-primary-foreground">
                  <MapPin className="h-4 w-4" />
                </span>
                Nationwide coverage
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-card p-8 shadow-elegant md:p-10">
            <h3 className="text-2xl">Get your free site survey</h3>
            <BookingDialog
              trigger={
                <Button size="lg" className="mt-6 h-12 w-full bg-accent text-accent-foreground hover:bg-brand-red-deep">
                  Open booking form <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy-deep text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="iSmart Security" className="h-10 w-auto brightness-0 invert opacity-90" />
          </div>
          <p className="text-xs">© {new Date().getFullYear()} iSmart Security. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <BookingDialog
          trigger={
            <Button className="h-12 w-full bg-accent text-accent-foreground hover:bg-brand-red-deep">
              Book free site survey
            </Button>
          }
        />
      </div>
    </div>
  );
}
