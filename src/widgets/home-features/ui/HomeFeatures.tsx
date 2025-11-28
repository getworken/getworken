/**
 * HomeFeatures Widget
 * @module widgets/home-features
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 *
 * Features grid section displaying 6 key platform features
 * with icons, titles, descriptions, and status badges.
 *
 * **Architecture Compliance:**
 * - FSD widgets/ layer (composite UI block)
 * - WCAG 2.2 compliant (semantic HTML, aria-labelledby)
 * - Imports only from shared/ layer (FSD rules)
 *
 * **Accessibility:**
 * - Semantic <section> element with aria-labelledby
 * - Proper heading hierarchy
 * - Status badges for feature availability
 *
 * @see {@link https://feature-sliced.design/docs/get-started/overview}
 * @see {@link https://www.w3.org/WAI/WCAG22/quickref/}
 */

/**
 * HomeFeatures Component
 *
 * Grid of 6 feature cards with icons, descriptions, and status.
 *
 * @returns {JSX.Element} The features component
 */
export function HomeFeatures() {
  return (
    <section
      id="features"
      className="border-t border-border py-16 md:py-24"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2
            id="features-heading"
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Everything you need to run field work
          </h2>
          <p className="muted text-lg">
            Powerful CRM, scheduling, quoting, and invoicing tools built for the
            field.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1 - CRM */}
          <article className="card p-6 transition-colors hover:border-primary/50">
            <div className="mb-4 text-4xl">👥</div>
            <h3 className="mb-2 text-xl font-bold">Client Management (CRM)</h3>
            <p className="muted mb-4 text-sm">
              Keep all client history, notes, jobs and details in one secure
              place.
            </p>
            <span className="badge badge-live">✓ Available Now</span>
          </article>

          {/* 2 - Scheduling */}
          <article className="card p-6 transition-colors hover:border-primary/50">
            <div className="mb-4 text-4xl">📅</div>
            <h3 className="mb-2 text-xl font-bold">Smart Scheduling</h3>
            <p className="muted mb-4 text-sm">
              Drag & drop calendar, crew assignment and conflict detection.
            </p>
            <span className="badge badge-dev">🔨 In Development</span>
          </article>

          {/* 3 - Quoting */}
          <article className="card p-6 transition-colors hover:border-primary/50">
            <div className="mb-4 text-4xl">📄</div>
            <h3 className="mb-2 text-xl font-bold">Instant Quoting</h3>
            <p className="muted mb-4 text-sm">
              Create and send professional, accurate quotes in minutes with PDF
              generation.
            </p>
            <span className="badge badge-dev">🔨 In Development</span>
          </article>

          {/* 4 - Payments */}
          <article className="card p-6 transition-colors hover:border-primary/50">
            <div className="mb-4 text-4xl">💳</div>
            <h3 className="mb-2 text-xl font-bold">Invoicing & Payments</h3>
            <p className="muted mb-4 text-sm">
              Automated invoices, online payments and receipts to improve cash
              flow.
            </p>
            <span className="badge badge-soon">⏳ Coming Soon</span>
          </article>

          {/* 5 - Dashboard */}
          <article className="card p-6 transition-colors hover:border-primary/50">
            <div className="mb-4 text-4xl">📈</div>
            <h3 className="mb-2 text-xl font-bold">Business Dashboard</h3>
            <p className="muted mb-4 text-sm">
              Real-time overview of sales, jobs, and team performance with
              analytics.
            </p>
            <span className="badge badge-soon">⏳ Coming Soon</span>
          </article>

          {/* 6 - Mobile */}
          <article className="card p-6 transition-colors hover:border-primary/50">
            <div className="mb-4 text-4xl">📱</div>
            <h3 className="mb-2 text-xl font-bold">Mobile & Web App</h3>
            <p className="muted mb-4 text-sm">
              Manage your business on the go. Native mobile app beta coming
              soon.
            </p>
            <span className="badge badge-soon">⏳ Coming Soon</span>
          </article>
        </div>
      </div>
    </section>
  );
}
