import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShieldCheck, Mail, Github } from "lucide-react";
import { useEffect } from "react";

export function SwitchlyPrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="container-max min-h-screen pb-28 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/#projects"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <header className="mb-12 border-b border-white/[0.08] pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-primary">Switchly</span>
            <span className="font-mono text-xs text-muted-foreground">· app.utils.switchly</span>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-400 border border-amber-500/20">
              Closed Testing
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Effective Date: November 13, 2026 · Last Updated: November 13, 2026
          </p>
        </header>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          <div className="rounded-2xl border border-white/[0.08] bg-card/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-foreground font-medium mb-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>100% On-Device, Zero Data Collection</span>
            </div>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Switchly</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the app&rdquo;) is
              committed to protecting your privacy. This Privacy Policy explains our practices regarding
              data collection, usage, and permissions.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">Summary: Zero Data Collection</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">No Data Collected:</strong> Switchly does not
                collect, record, transmit, or share any personal information, telemetry, analytics, or
                behavioral data.
              </li>
              <li>
                <strong className="text-foreground">No Third-Party Trackers:</strong> Switchly contains{" "}
                <strong className="text-foreground">zero</strong> analytics SDKs, advertising SDKs,
                tracking libraries, or external telemetry tools.
              </li>
              <li>
                <strong className="text-foreground">No Cloud Accounts Required:</strong> All features
                operate entirely offline and on-device.
              </li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-medium text-foreground">
              Sensitive Permissions and How They Are Used
            </h2>
            <p>
              Switchly uses Android system features and permissions solely to provide on-device Quick
              Settings utility toggles. Below is a detailed breakdown of each permission:
            </p>

            <div className="space-y-6 border-l-2 border-white/[0.08] pl-5">
              <div className="space-y-2">
                <h3 className="text-base font-medium text-foreground">
                  1. VPN Service (<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-primary">VpnService</code>)
                </h3>
                <p>
                  <strong className="text-foreground">Feature:</strong> Internet Kill Switch tile.
                </p>
                <p>
                  <strong className="text-foreground">Usage:</strong> Switchly establishes a{" "}
                  <strong className="text-foreground">local blackhole VPN interface</strong> on your device to
                  drop outgoing and incoming network packets when you tap the Kill Switch tile, allowing you
                  to instantly sever network connectivity for selected or all apps.
                </p>
                <p>
                  <strong className="text-foreground">Data Policy:</strong> No traffic is inspected,
                  decrypted, routed to external servers, logged, or collected. The local tunnel interface
                  operates purely on-device as a local circuit breaker.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-foreground">
                  2. Usage Access (<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-primary">PACKAGE_USAGE_STATS</code>)
                </h3>
                <p>
                  <strong className="text-foreground">Feature:</strong> Screen Time Quick Settings tiles and
                  Public Mode app protection.
                </p>
                <p>
                  <strong className="text-foreground">Usage:</strong> Reads real-time foreground application
                  usage statistics from Android&apos;s <code>UsageStatsManager</code> to:
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Display today&apos;s screen time for your chosen app directly in your Quick Settings panel.</li>
                  <li>Detect when a restricted application is opened during Public Mode.</li>
                </ol>
                <p>
                  <strong className="text-foreground">Data Policy:</strong> Usage statistics are calculated
                  strictly in memory on your device. No application history, app names, or timestamps are
                  ever uploaded or shared.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-foreground">
                  3. Display Over Other Apps (<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-primary">SYSTEM_ALERT_WINDOW</code>)
                </h3>
                <p>
                  <strong className="text-foreground">Feature:</strong> Public Mode.
                </p>
                <p>
                  <strong className="text-foreground">Usage:</strong> Used to display a temporary, on-device
                  security lock overlay when a user attempts to launch a restricted application while Public
                  Mode is enabled.
                </p>
                <p>
                  <strong className="text-foreground">Data Policy:</strong> The overlay is rendered locally
                  by the Android <code>WindowManager</code>. No user input, keystrokes, or screen contents
                  are captured or recorded.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-foreground">
                  4. Do Not Disturb Access (<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-primary">ACCESS_NOTIFICATION_POLICY</code>)
                </h3>
                <p>
                  <strong className="text-foreground">Feature:</strong> Public Mode notification privacy.
                </p>
                <p>
                  <strong className="text-foreground">Usage:</strong> Used to temporarily suppress incoming
                  notification previews and sounds when your phone is handed to someone else in Public Mode,
                  protecting your private messages.
                </p>
                <p>
                  <strong className="text-foreground">Data Policy:</strong> No notification contents, titles,
                  sender information, or text are ever read or logged.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-foreground">
                  5. Camera (<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-primary">CAMERA</code>)
                </h3>
                <p>
                  <strong className="text-foreground">Feature:</strong> Quick Settings QR Scanner and Payment QR code reader.
                </p>
                <p>
                  <strong className="text-foreground">Usage:</strong> The camera is accessed only while the
                  scanner viewfinder is actively open on your screen to parse QR code payloads locally using
                  on-device computer vision.
                </p>
                <p>
                  <strong className="text-foreground">Data Policy:</strong> No pictures, frames, or video
                  recordings are saved, stored in gallery, or transmitted over the internet.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-foreground">
                  6. Foreground Services (<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-primary">FOREGROUND_SERVICE</code>,{" "}
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-primary">FOREGROUND_SERVICE_SPECIAL_USE</code>)
                </h3>
                <p>
                  <strong className="text-foreground">Feature:</strong> Caffeine tile (keeps screen on) and
                  Public Mode (monitors foreground app during device handover).
                </p>
                <p>
                  <strong className="text-foreground">Usage:</strong> Required by Android to maintain a
                  user-visible status bar notification while Caffeine or Public Mode is actively running,
                  allowing you to stop the service at any time with a single tap.
                </p>
                <p>
                  <strong className="text-foreground">Data Policy:</strong> Foreground services do not
                  collect or exfiltrate any data.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium text-foreground">
                  7. Write Secure Settings (<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-primary">WRITE_SECURE_SETTINGS</code>)
                </h3>
                <p>
                  <strong className="text-foreground">Feature:</strong> Private DNS, Grayscale, Animator
                  Duration Scale, and Network Mode tiles.
                </p>
                <p>
                  <strong className="text-foreground">Usage:</strong> An optional Android system permission
                  granted by the user via ADB (
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs">
                    adb shell pm grant app.utils.switchly android.permission.WRITE_SECURE_SETTINGS
                  </code>
                  ) to allow Switchly to toggle native system settings that Android does not expose to
                  third-party apps by default.
                </p>
                <p>
                  <strong className="text-foreground">Data Policy:</strong> Used exclusively to modify
                  specific user-requested system settings keys. No settings data is gathered or uploaded.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">App Updates</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Google Play Edition:</strong> Updates are distributed
                and managed exclusively via the official Google Play In-App Updates API (
                <code>in_app_update</code>). The Google Play build does not request{" "}
                <code>REQUEST_INSTALL_PACKAGES</code> and adheres strictly to Google Play&apos;s Device and
                Network Abuse Policy.
              </li>
              <li>
                <strong className="text-foreground">GitHub Edition:</strong> Standalone APK releases
                available on GitHub check GitHub&apos;s public API for releases and allow manual sideloaded
                updating.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">Data Storage &amp; Retention</h2>
            <p>
              All user preferences, custom quick text snippets, payment QR images, and tile configurations
              are stored locally on your device within Android&apos;s sandboxed private app storage (
              <code>SharedPreferences</code> and app data directory). This data is completely deleted when
              you clear app data or uninstall the app.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">Children&apos;s Privacy</h2>
            <p>
              Switchly does not address or target anyone under the age of 13. We do not knowingly collect or
              solicit personal information from children.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected in this
              document with an updated &ldquo;Last Updated&rdquo; date.
            </p>
          </section>

          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-card/40 p-6">
            <h2 className="text-xl font-medium text-foreground">Contact Us</h2>
            <p>
              If you have any questions or feedback about this Privacy Policy or Switchly&apos;s data
              practices, please contact:
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 pt-2">
              <a
                href="mailto:developer@abhishek-sharma.com.np"
                className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                developer@abhishek-sharma.com.np
              </a>
              <a
                href="https://github.com/4bhisheksharma/switchly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                <Github className="h-4 w-4 text-primary" />
                GitHub Repository
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </div>
            <div className="pt-2">
              <a
                href="https://play.google.com/store/apps/details?id=app.utils.switchly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-primary underline underline-offset-4 hover:opacity-80"
              >
                Open Google Play Store listing (Closed Testing)
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

