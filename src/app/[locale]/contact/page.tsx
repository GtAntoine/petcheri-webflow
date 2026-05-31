"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHeroCentered } from "@/components/sections/page-hero-centered";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import { HAPTIC } from "@/lib/haptics";
import { triggerHaptic } from "@/lib/haptics-engine";

const HOURS = [
  "Lundi — Vendredi : 9h – 18h",
  "Samedi : 9h – 18h",
  "Dimanche : 9h – 18h",
];

const INFO_ITEMS = [
  { Icon: Mail,    label: "Email",    value: "contact@petcheri.com",      href: "mailto:contact@petcheri.com" },
  { Icon: Phone,   label: "Téléphone", value: "01 XX XX XX XX",            href: "tel:+33100000000" },
  { Icon: MapPin,  label: "Paris",    value: "Paris, France",              href: null },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  function handleSubmitClick() {
    if (formRef.current && !formRef.current.checkValidity()) {
      triggerHaptic(HAPTIC.error);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    triggerHaptic(HAPTIC.tap);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      triggerHaptic(HAPTIC.success);
    }, 1200);
  }

  return (
    <>
      <Navbar />

      <PageHeroCentered
        badge="Réponse sous 24h"
        title={<>Comment pouvons-nous <span className="text-accent">vous aider&nbsp;?</span></>}
        subtitle="Contactez-nous pour toutes questions concernant nos services, toute demande de renseignements — nous serons heureux de vous aider !"
      />

      {/* Main content */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left — info + hours */}
            <div className="flex flex-col gap-8">
              {/* Contact info */}
              <div className="card-base p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fde0d4" }}>
                    <PawPrintIcon size={20} color="#E8705A" strokeWidth={1.8} />
                  </div>
                  <h2 className="text-h3 text-[--color-chocolat]">Nos coordonnées</h2>
                </div>
                <div className="space-y-4">
                  {INFO_ITEMS.map(({ Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[--color-creme] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[--color-muted-foreground]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[--color-chocolat]">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-[--color-muted-foreground] hover:text-[--color-chocolat] transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-[--color-muted-foreground]">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="card-base p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[--color-creme] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[--color-muted-foreground]" />
                  </div>
                  <h2 className="text-h3 text-[--color-chocolat]">Horaires</h2>
                </div>
                <ul className="space-y-2">
                  {HOURS.map((h) => (
                    <li key={h} className="text-sm text-[--color-muted-foreground] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* App CTA */}
              <div
                className="card-base p-8 text-center"
                style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
              >
                <p className="text-sm font-semibold text-[--color-chocolat] mb-2">
                  Besoin d&apos;une réservation rapide ?
                </p>
                <p className="text-sm text-[--color-muted-foreground] mb-4">
                  Notre application est disponible 7j/7.
                </p>
                <a
                  href="https://prettyform.addxt.com/a/form/?vf=1FAIpQLSdwrFAcP9eRFGoVCs4BqNtZD7Iqc-uW7UjRduB-NcfR10qxTQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
                  style={{ background: "#E8705A" }}
                >
                  Accéder à l&apos;app
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-2">
              <div className="card-base p-10">
                <h2 className="text-h2 text-[--color-chocolat] mb-2">Envoyez-nous un message</h2>
                <p className="text-lead mb-8">
                  Votre demande sera traitée dans les plus brefs délais.
                </p>

                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#fde0d4" }}>
                      <PawPrintIcon size={22} color="#E8705A" />
                    </div>
                    <h3 className="text-h3 text-[--color-chocolat] mb-2">Message envoyé !</h3>
                    <p className="text-sm text-[--color-muted-foreground]">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[--color-chocolat] mb-2">
                          Prénom <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Marie"
                          className="w-full rounded-xl border border-[--color-border] bg-white px-4 py-3 text-sm text-[--color-chocolat] placeholder:text-[--color-muted] focus:outline-none focus:border-[#E8705A] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[--color-chocolat] mb-2">
                          Nom <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Dupont"
                          className="w-full rounded-xl border border-[--color-border] bg-white px-4 py-3 text-sm text-[--color-chocolat] placeholder:text-[--color-muted] focus:outline-none focus:border-[#E8705A] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[--color-chocolat] mb-2">
                          Email <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="marie@email.com"
                          className="w-full rounded-xl border border-[--color-border] bg-white px-4 py-3 text-sm text-[--color-chocolat] placeholder:text-[--color-muted] focus:outline-none focus:border-[#E8705A] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[--color-chocolat] mb-2">
                          Téléphone <span className="text-accent">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="06 XX XX XX XX"
                          className="w-full rounded-xl border border-[--color-border] bg-white px-4 py-3 text-sm text-[--color-chocolat] placeholder:text-[--color-muted] focus:outline-none focus:border-[#E8705A] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[--color-chocolat] mb-2">
                        Votre message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Décrivez votre demande, votre animal, vos besoins…"
                        className="w-full rounded-xl border border-[--color-border] bg-white px-4 py-3 text-sm text-[--color-chocolat] placeholder:text-[--color-muted] focus:outline-none focus:border-[#E8705A] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      onClick={handleSubmitClick}
                      className="w-full rounded-full py-4 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-60"
                      style={{ background: "#E8705A" }}
                    >
                      {loading ? "Envoi en cours…" : "Envoyer le message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
