import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ArrowRight, Mail, Calendar } from "lucide-react";

export function ClosingInvitationSection() {
  return (
    <section
      id="contact"
      aria-label="Invitation and direct connection"
      className="border-ink/12 bg-paper border-b py-24 lg:py-36"
    >
      <div className="container-proof">
        {/* Invitation Header Strip */}
        <div className="border-ink/15 text-ink/60 mb-14 flex items-center justify-between border-b pb-4 font-mono text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="bg-mao-red size-1.5" />
            <span>07 &mdash; THE INVITATION &bull; DIRECT CONNECTION</span>
          </div>
          <span className="text-mao-red font-semibold">
            FINAL FRAME // REACH
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Reaching Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              <div className="crop-marks border-ink/15 bg-paper relative aspect-[4/5] w-full overflow-hidden border shadow-[0_16px_50px_rgba(20,20,20,0.08)]">
                <Image
                  src="/images/portraits/segun-invitation.jpg"
                  alt="Segun Michael reaching forward with an open, welcoming gesture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />

                <div className="bg-ink/80 text-paper absolute top-3 left-3 px-2.5 py-1 font-mono text-[10px]">
                  FRAME 07 // INVITATION
                </div>
              </div>

              <div className="text-ink/50 mt-3 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                <span>SEGFRAME-INV-07</span>
                <span>OPEN DISCOURSE &bull; WORLDWIDE</span>
              </div>
            </div>
          </div>

          {/* Invitation Copy & Actions */}
          <div className="lg:col-span-7">
            <p className="text-mao-red mb-3 font-mono text-xs tracking-widest uppercase">
              BEGIN THE CONVERSATION
            </p>

            <h2 className="font-display text-ink text-3xl leading-tight font-light sm:text-4xl lg:text-5xl">
              Every meaningful connection begins with a conversation.
            </h2>

            <p className="text-ink/80 mt-6 font-sans text-base leading-relaxed sm:text-lg">
              Whether you want to explore a listening session, commission a
              photographic or editorial story with MAO Media, discuss a property
              transformation, or simply start a thoughtful conversation, my
              inbox is open.
            </p>

            {/* Direct Connect Options */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href={siteConfig.bookingHref}
                className="group border-ink/20 bg-paper-light hover:border-mao-red hover:bg-paper flex items-start gap-4 border p-4 transition-all"
              >
                <div className="border-ink/20 bg-paper text-mao-red group-hover:border-mao-red flex size-10 shrink-0 items-center justify-center border transition-colors">
                  <Calendar className="size-4" />
                </div>
                <div>
                  <h3 className="font-display text-ink group-hover:text-mao-red text-base font-normal transition-colors">
                    The Listening Hub
                  </h3>
                  <p className="text-ink/70 mt-0.5 text-xs">
                    Book a dedicated 60-minute confidential session.
                  </p>
                </div>
              </Link>

              <Link
                href="/contact"
                className="group border-ink/20 bg-paper-light hover:border-mao-red hover:bg-paper flex items-start gap-4 border p-4 transition-all"
              >
                <div className="border-ink/20 bg-paper text-mao-red group-hover:border-mao-red flex size-10 shrink-0 items-center justify-center border transition-colors">
                  <Mail className="size-4" />
                </div>
                <div>
                  <h3 className="font-display text-ink group-hover:text-mao-red text-base font-normal transition-colors">
                    General &amp; Studio Inquiries
                  </h3>
                  <p className="text-ink/70 mt-0.5 text-xs">
                    Commissions, media projects &amp; property inquiries.
                  </p>
                </div>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 font-mono text-xs">
              <Link
                href={siteConfig.bookingHref}
                className="bg-ink text-paper hover:bg-mao-red inline-flex items-center gap-2.5 px-6 py-3.5 font-medium tracking-wider uppercase transition-all"
              >
                <span className="bg-mao-red size-2 rounded-full" />
                <span>Book a Session Now</span>
                <ArrowRight className="size-3.5" />
              </Link>

              <Link
                href="/contact"
                className="text-ink hover:text-mao-red border-ink/40 inline-flex items-center gap-2 border-b pb-0.5 transition-colors"
              >
                <Mail className="size-3.5" />
                <span>Send a Direct Message &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
