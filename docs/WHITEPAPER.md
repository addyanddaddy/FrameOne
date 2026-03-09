# FrameOne — Platform White Paper

**Prepared for:** Ralph, Shahpoor & the FrameOne Founding Team
**Prepared by:** Brandon Bible (Technical Lead)
**Date:** March 9, 2026
**Version:** 1.0

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [The Problem We're Solving](#2-the-problem-were-solving)
3. [What FrameOne Is](#3-what-frameone-is)
4. [How the Platform Works](#4-how-the-platform-works)
5. [User Types & Roles](#5-user-types--roles)
6. [Complete Role Directory](#6-complete-role-directory)
7. [Membership & Pricing](#7-membership--pricing)
8. [Core Features Breakdown](#8-core-features-breakdown)
9. [User Journeys](#9-user-journeys)
10. [Payment System](#10-payment-system)
11. [Trust & Reputation System](#11-trust--reputation-system)
12. [Technical Architecture Overview](#12-technical-architecture-overview)
13. [Site Map & Page Structure](#13-site-map--page-structure)
14. [API Endpoints](#14-api-endpoints)
15. [Database Structure](#15-database-structure)
16. [Security & Privacy](#16-security--privacy)
17. [Development Roadmap](#17-development-roadmap)
18. [Access & Login Information](#18-access--login-information)
19. [How to Deploy & Run](#19-how-to-deploy--run)
20. [Competitive Landscape](#20-competitive-landscape)
21. [Revenue Projections](#21-revenue-projections)

---

## 1. Executive Summary

**FrameOne** is a professional networking, hiring, and project management platform purpose-built for the entertainment industry. It serves as the bridge between talent (actors, crew, vendors) and the people who hire them (producers, casting directors, department heads).

Unlike generic platforms like LinkedIn or Indeed, FrameOne understands how the entertainment industry actually works:

- **Projects are temporary.** A film crew assembles for weeks or months, then disperses.
- **Hiring is referral-based.** Over 80% of crew hires come through personal networks.
- **Authority is hierarchical.** A Producer hires a Line Producer, who hires Department Heads, who staff their teams.
- **Trust is everything.** One unreliable crew member can cost a production $50,000+ per day.
- **Availability is critical.** Holds, bookings, and date conflicts drive every hiring decision.

FrameOne captures all of this in a platform that lets professionals:

- **Create and manage profiles** across multiple roles (a person can be both a Director and a Writer)
- **Build verified trust networks** through real project collaborations
- **Staff entire productions** with a department-aware hiring system
- **Run casting** with breakdowns, submissions, auditions, and shortlists
- **Process payments** between productions and vendors
- **Search and discover** talent by role, department, location, availability, and experience

### What We've Built

| Metric | Count |
|--------|-------|
| Lines of code | 7,173 |
| Database tables | 25 |
| API endpoints | 24 |
| User-facing pages | 7 |
| UI components | 9 |
| Industry roles supported | 43 |
| Department categories | 9 |
| Membership tiers | 5 |

The platform is built with **Next.js 14** (React), **TypeScript**, **PostgreSQL** (database), **Stripe Connect** (payments), and **Tailwind CSS** (styling). It is designed to scale to **30,000+ concurrent users**.

---

## 2. The Problem We're Solving

### The Entertainment Labor Market Is Broken Online

The entertainment industry is a **$180 billion annual market** in the US alone, with **2.6 million workers**. Yet the tools available to these professionals are either:

1. **Too generic** — LinkedIn, Indeed, and Glassdoor don't understand departments, roles, or the project-based nature of the work.
2. **Too narrow** — Backstage and Casting Networks focus only on actors. StaffMeUp is crew-only. Neither connects the full ecosystem.
3. **Non-existent for operations** — No platform combines hiring, project management, payments, and professional networking in one place.

### The Result

- **Producers** maintain private spreadsheets and text message chains to staff productions.
- **Crew members** rely on word-of-mouth and hope their phone rings.
- **Casting directors** juggle multiple platforms, email chains, and paper headshots.
- **Vendors** (catering, transport, equipment) get hired through phone calls and lose invoices.
- **New entrants** can't break in because the "who you know" barrier is invisible.

### What the Industry Needs

A single platform that:
- Mirrors the actual department structure and hiring hierarchy
- Builds trust through verified collaborations, not self-reported resumes
- Handles the full lifecycle: discover → hire → work → pay → endorse
- Serves ALL roles — from Executive Producers to Set PAs to Caterers

**That's FrameOne.**

---

## 3. What FrameOne Is

FrameOne is a **three-sided marketplace**:

```
┌─────────────────────────────────────────────────────────────┐
│                        FRAMEONE                             │
│                                                             │
│   ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│   │   SUPPLY    │  │    DEMAND    │  │    SERVICES     │   │
│   │             │  │              │  │                 │   │
│   │  Actors     │  │  Producers   │  │  Catering       │   │
│   │  Crew       │  │  Directors   │  │  Transport      │   │
│   │  Writers    │  │  Casting     │  │  Equipment      │   │
│   │  Designers  │  │  Line Prod.  │  │  Security       │   │
│   │  Technicians│  │  Dept Heads  │  │  Medical        │   │
│   │             │  │              │  │                 │   │
│   │  GOAL:      │  │  GOAL:       │  │  GOAL:          │   │
│   │  Get hired, │  │  Find & hire │  │  Get booked,    │   │
│   │  build      │  │  the right   │  │  get paid       │   │
│   │  reputation │  │  people fast │  │  on time         │   │
│   └─────────────┘  └──────────────┘  └─────────────────┘   │
│                                                             │
│                    TRUST NETWORK                            │
│          (Worked-with edges + Endorsements)                 │
└─────────────────────────────────────────────────────────────┘
```

### Core Concepts

| Concept | What It Means |
|---------|---------------|
| **Multi-Role Identity** | One person can hold multiple professional roles (e.g., Director + Writer). Each role has its own profile, portfolio, and endorsements. |
| **Project-Based Hiring** | Every hire happens within a Project. Projects have stages (Development → Production → Post), budgets, locations, and team members with specific authority levels. |
| **Authority Chain** | Not everyone can hire everyone. A Producer can hire a Line Producer. A Line Producer can hire Department Heads. A DP can hire camera crew. Permissions are project-scoped. |
| **Worked-With Graph** | When two people are assigned to the same project, a verified "worked-with" connection is automatically created. This is the trust backbone of the platform. |
| **Endorsements** | After working together, professionals can endorse each other for specific qualities (skill, reliability, professionalism, creativity, leadership). Endorsements carry the weight of the endorser's reputation. |
| **Availability System** | Every professional has a calendar showing their status: Available, Soft Hold, Firm Hold, or Booked. This is searchable by date and location. |
| **Two-Lane Payments** | Lane 1 (now): Vendor invoices → approval → Stripe payout. Lane 2 (future): Labor payroll with tax compliance. |

---

## 4. How the Platform Works

### The User Flow (High Level)

```
VISITOR
  │
  ├─→ Lands on FrameOne.com (public landing page)
  │     - Sees role showcase, features, pricing
  │     - Clicks "Get Started Free"
  │
  ├─→ REGISTRATION
  │     - Name, email, password
  │     - Account created automatically
  │
  ├─→ ONBOARDING (4-step wizard)
  │     │
  │     ├─ Step 1: CHOOSE ROLES
  │     │    - Browse 9 department groups
  │     │    - Select one or more roles (e.g., Director + Screenwriter)
  │     │    - Each role has a level badge (HOD, Key, Assistant, Trainee)
  │     │
  │     ├─ Step 2: BUILD PROFILES
  │     │    - For each selected role, enter:
  │     │      Display name, bio, city, state, country
  │     │    - (Later: portfolio URL, reel URL, resume)
  │     │
  │     ├─ Step 3: SELECT PLAN
  │     │    - Free ($0) — basic profile, apply to jobs
  │     │    - Pro Supply ($19/mo) — featured, rich media
  │     │    - Hiring Pro ($149/mo) — create projects, post jobs
  │     │    - Department Head ($49/mo) — dept management
  │     │    - Agency/Studio ($499/mo) — enterprise
  │     │
  │     └─ Step 4: WELCOME
  │          - Success screen
  │          - Links to complete profile, browse projects, search talent
  │
  └─→ DASHBOARD (authenticated home)
        - Stats: active projects, applications, profile views, endorsements
        - Quick actions: create project, browse, update availability
        - Recent activity feed
```

### The Hiring Flow

```
PRODUCER creates a Project
  │  (title, format, budget band, dates, locations)
  │
  ├─→ Invites LINE PRODUCER as project member
  │     (given authority: canHire, canApproveOffers, canApproveInvoices)
  │
  ├─→ Line Producer hires DEPARTMENT HEADS
  │     ├─ Director of Photography
  │     ├─ Production Designer
  │     ├─ First Assistant Director
  │     ├─ Production Sound Mixer
  │     └─ etc.
  │
  ├─→ Each Department Head opens REQUISITIONS
  │     (role needed, dates, rate range, requirements)
  │
  ├─→ Crew members APPLY to requisitions
  │     (cover note, materials/reel links)
  │
  ├─→ Department Head reviews, creates OFFER
  │     (proposed rate, terms)
  │     │
  │     ├─→ Offer goes through APPROVAL GATE
  │     │     (LP or Producer must approve offers above threshold)
  │     │
  │     └─→ Applicant ACCEPTS or COUNTERS
  │
  └─→ ASSIGNMENT created
        │
        ├─→ Worked-with edges generated with all other project members
        ├─→ Endorsement eligibility unlocked
        └─→ Credit added to professional's profile
```

### The Casting Flow

```
CASTING DIRECTOR creates a BREAKDOWN
  │  (role name, description, age range, gender, compensation, deadline)
  │
  ├─→ TALENT submits to breakdown
  │     (headshot, reel link, cover note)
  │
  ├─→ Casting Director reviews SUBMISSIONS
  │     ├─ Views / shortlists / rejects
  │     │
  │     ├─→ Schedules AUDITIONS
  │     │     (in-person, self-tape, or virtual)
  │     │
  │     └─→ Creates SHORTLIST
  │           (ranked candidates with hold status)
  │
  └─→ Final selection → BOOKING
        (assignment created, worked-with edges generated)
```

---

## 5. User Types & Roles

FrameOne supports **43 specialized roles** organized into **9 department groups**. This is critical — the entertainment industry doesn't have generic "workers." Every role has specific responsibilities, hiring relationships, and network dependencies.

### The 9 Department Groups

| # | Department | What They Do | # of Roles |
|---|-----------|-------------|-----------|
| 1 | **Above-the-Line** | Creative and financial leadership | 6 |
| 2 | **Production Office** | Logistics, administration, cost control | 5 |
| 3 | **Assistant Directing** | Scheduling, set management, safety | 4 |
| 4 | **Camera / Lighting / Grip** | Image capture and physical support | 7 |
| 5 | **Art / Costume / HMU** | Visual world-building and appearance | 6 |
| 6 | **Sound** | Production audio capture | 2 |
| 7 | **Post-Production** | Editing, VFX, delivery | 3 |
| 8 | **Services & Vendors** | Catering, transport, equipment, etc. | 6 |
| 9 | **Representation & Legal** | Agents, managers, casting, lawyers | 4 |

### Why This Matters

Ralph's original site had 7 roles: Director, Project Manager, Casting Agent, Lawyer, Talent, Crew, Caterer.

**The problem:** "Crew" is not a role — it's dozens of roles across different departments with different skills, different hiring paths, and different rates. A Gaffer and a Costume Designer have nothing in common except both being "below the line." Lumping them together makes the platform useless for actual hiring.

FrameOne's taxonomy mirrors how productions actually staff: by department, with specific roles at specific levels.

---

## 6. Complete Role Directory

### Above-the-Line (Creative & Financial Leadership)

| Role | Level | Description |
|------|-------|-------------|
| **Producer** | HOD | Principal project authority. Responsible for all aspects from development to distribution. Hires the Line Producer and key creative team. |
| **Executive Producer** | HOD | Oversees the journey from script to screen. Manages relationships with commissioners and financiers. |
| **Director** | HOD | Creative visionary. Interprets the script and guides all creative departments. |
| **Screenwriter** | Principal | Develops and writes screenplays, treatments, and story materials. |
| **Development Producer** | HOD | Finds and develops stories/scripts to production readiness. |
| **Script Editor** | Key | Liaises between writer and production to improve scripts through structured feedback. |

### Production Office (Logistics & Administration)

| Role | Level | Description |
|------|-------|-------------|
| **Line Producer** | HOD | Hires crew, allocates budget, ensures filming is safe, on budget, and on time. The "hiring spine" of every production. |
| **Production Manager / UPM** | HOD | Manages day-to-day logistics, schedules, resources, and personnel. |
| **Production Coordinator** | Key | Prepares and distributes crew lists, progress reports, call sheets, and transport requirements. |
| **Production Accountant** | Key | Manages accounts, processes payments, conducts payroll checks, ensures tax/employment compliance. |
| **Production Assistant / Runner** | Trainee | Distributes paperwork, handles errands, provides general production support. Entry-level position. |

### Assistant Directing (Schedule & Set Management)

| Role | Level | Description |
|------|-------|-------------|
| **First Assistant Director** | HOD | Plans the filming schedule, breaks down the script, manages the set during filming. The Director's operational right hand. |
| **Second Assistant Director** | Key | Organizes fittings/rehearsals, prepares call sheets, coordinates actor readiness. |
| **Floor Runner / Set PA** | Trainee | Supports the AD team with on-set errands, messages, and logistics. |
| **Script Supervisor** | Key | Monitors continuity, coverage, and serves as the link between director and editorial. |

### Camera / Lighting / Grip (Image Capture & Support)

| Role | Level | Description |
|------|-------|-------------|
| **Director of Photography** | HOD | Defines the photographic look. Determines lighting and framing. Supervises camera, grip, and lighting departments. |
| **Camera Operator** | Key | Plans movement, frames and composes shots, coordinates with grips. |
| **First Assistant Camera** | Assistant | Manages camera crew, sets up and maintains cameras, executes focus pulling. |
| **Digital Imaging Technician** | Key | Manages digital workflow, advises on exposure/contrast, ensures image pipeline integrity. |
| **Gaffer** | HOD | Head of lighting. Plans and executes on-set lighting. Responsible for electrical safety. |
| **Key Grip** | HOD | Makes camera movement physically possible. Plans rigging and camera support execution. |
| **Video Assist Operator** | Assistant | Assists director and script supervisor with monitored playback and continuity. |

### Art / Costume / HMU (Visual World-Building)

| Role | Level | Description |
|------|-------|-------------|
| **Production Designer** | HOD | Creates the visual world of the production. Coordinates all visual departments. |
| **Art Director** | Key | Interprets and operationalizes the production designer's vision. |
| **Set Decorator** | Key | Creates background environments — walls, floors, furniture, vehicles. |
| **Props Master** | Key | Runs the property department. Makes, stores, transports, and prepares all props. |
| **Costume Designer** | HOD | Designs, creates, and sources all costumes in collaboration with the creative team. |
| **Hair & Makeup Designer** | HOD | Creates hair and makeup looks. Breaks down script requirements. Recruits HMU team. |

### Sound (Production Audio)

| Role | Level | Description |
|------|-------|-------------|
| **Production Sound Mixer** | HOD | Head of sound department. Responsible for all audio captured during filming. |
| **Boom Operator** | Assistant | Handles mic placement on set. Operates boom pole. Places personal mics on talent. |

### Post-Production (Editing & Delivery)

| Role | Level | Description |
|------|-------|-------------|
| **Editor** | HOD | Crafts the story from assembly through picture lock. Works closely with director and producers. |
| **Post-Production Supervisor** | HOD | Manages post budget, schedules, vendors, and technical delivery requirements. |
| **Colorist** | Key | Performs color grading and correction to achieve the final visual look. |

### Services & Vendors

| Role | Level | Type | Description |
|------|-------|------|-------------|
| **Catering** | Key | Vendor | Provides scheduled meals for cast and crew on location. |
| **Craft Services** | Key | Vendor | Provides continuous snacks, drinks, and refreshment support throughout the day. |
| **Transportation Captain** | Key | Staff | Oversees movement of all cast, crew, equipment, and picture vehicles. |
| **Security** | Key | Vendor | Provides set and location security services. |
| **Set Medic** | Key | Vendor | Provides on-set medical support and first aid. |
| **Equipment Rental** | Key | Vendor | Provides camera, lighting, grip, and other production equipment. |

### Representation & Legal

| Role | Level | Description |
|------|-------|-------------|
| **Casting Director** | HOD | Matches actors to roles. Manages auditions and talent recommendations. Hired by the production. |
| **Talent Agent** | Key | Represents and promotes clients. Handles contract negotiation and submissions. |
| **Talent Manager** | Key | Provides long-term career strategy, packaging, and professional guidance. |
| **Entertainment Lawyer** | Key | Handles contracts, rights clearance, chain-of-title documentation, and legal compliance. |

---

## 7. Membership & Pricing

### Pricing Strategy

Our pricing separates **what you do** (your role) from **what you pay** (your tier). A Producer on the Free tier and a PA on the Free tier both have basic profiles — but a Producer who wants to create projects and hire people needs the Hiring Pro tier.

This is the opposite of Ralph's original approach, where each role had a fixed price. That model breaks when someone is both a Director ($99/mo) and a Producer — do they pay both?

### Tier Structure

| Tier | Monthly Price | Target Users | What You Get |
|------|-------------|-------------|-------------|
| **Free** | $0 | Talent & Crew (entry) | Basic profile, apply to public jobs, limited messages, browse projects |
| **Pro Supply** | $19/mo | Talent & Crew (serious) | Featured search placement, rich media portfolio, availability alerts, priority applications, endorsement badges |
| **Hiring Pro** | $149/mo | Producers, Line Producers, Production Managers, Casting Directors | Create unlimited projects, post requisitions, send offers, casting breakdowns, shortlist management, invoice workflows, team collaboration |
| **Department Head** | $49/mo | DPs, Production Designers, Sound Mixers, 1st ADs | Department requisitions, crew roster management, limited offer approvals, enhanced portfolio, priority search |
| **Agency / Studio** | $499/mo | Agencies, Management Companies, Production Studios | Multi-user seats, slate management, compliance filters, bulk workflows, API access, dedicated support, custom branding |

### Revenue Model

| Revenue Stream | When | How |
|---------------|------|-----|
| **Subscriptions** | MVP | Monthly recurring revenue from paid tiers |
| **Transaction fees** | MVP | Percentage fee on vendor invoice payouts (e.g., 2.9% + $0.30) |
| **Featured listings** | Phase 2 | Vendors and service providers pay for featured placement in search |
| **Enterprise contracts** | Phase 3 | Annual contracts with studios and agencies |

### Why Free Tier Matters

The supply side (talent and crew) must be free or very cheap. They are the "inventory" of the marketplace. If we charge $50/mo for actors (like Ralph's original pricing), we'll never reach the density needed for producers to find value. The industry standard (Backstage, Casting Networks) charges $20-30/mo for talent. We undercut them at $0 for basic and $19 for premium.

Revenue comes from the **demand side** — the people who hire. A Producer saving 20 hours of phone calls to staff a production will gladly pay $149/mo.

---

## 8. Core Features Breakdown

### 8.1 Multi-Role Profiles

Every user can maintain profiles across multiple roles. This is unique to FrameOne.

**Example:** Sarah is a Director of Photography on feature films but also works as a Camera Operator on commercials and teaches as a DIT on training films. On FrameOne, she has three role profiles:
- **DP profile** — feature film reel, credits from major projects, endorsements from directors
- **Camera Operator profile** — commercial reel, different credits
- **DIT profile** — training work, technical certifications

Each profile has its own: bio, portfolio, reel, credits, endorsements, and availability settings.

### 8.2 Project Management

Projects are the organizational unit for all hiring, casting, and payments.

**A Project includes:**
- Title and logline
- Format (Feature, Episodic, Short, Commercial, Music Video, Documentary, Web Series, Theater)
- Stage (Development, Pre-Production, Production, Post-Production, Distribution)
- Budget band (optional, visible only to authorized members)
- Date range
- Locations
- Team members with specific authority permissions

### 8.3 Requisitions & Applications

Within a project, authorized members post **Requisitions** — specific job openings.

**A Requisition includes:**
- Role (from the 43-role taxonomy)
- Department
- Level (HOD, Key, Assistant, Trainee)
- Date range
- Rate range and rate type (hourly, daily, weekly, flat)
- Location requirements
- Status: Draft → Open → Filled → Cancelled

Professionals **Apply** to requisitions with a cover note and materials (reel links, portfolio).

### 8.4 Offers & Assignments

When a hiring authority selects an applicant, they create an **Offer** with specific terms and rate. The offer goes through an **Approval Gate** — if the rate exceeds the Line Producer's threshold, the Producer must also approve.

When accepted, an **Assignment** is created, which:
- Confirms the person on the project
- Generates **worked-with edges** with all other assigned team members
- Unlocks **endorsement eligibility** between collaborators
- Creates a **Credit** on the professional's profile

### 8.5 Casting Workflow

For talent roles, the casting flow is separate and more nuanced:

1. **Breakdown** — Casting Director posts character descriptions with age range, gender, ethnicity, compensation
2. **Submissions** — Talent (or their agents) submit headshots, reels, and cover notes
3. **Auditions** — In-person, self-tape, or virtual auditions are scheduled
4. **Shortlist** — Ranked candidates with hold status (Soft Hold, Firm Hold)
5. **Booking** — Final selection converts to an assignment

### 8.6 Search & Discovery

The Discover page lets anyone search across the entire platform:
- **By role/department** — "Show me all DPs in Atlanta"
- **By availability** — "Who's available in March?"
- **By location** — city, state, country, radius
- **By experience level** — HOD, Key, Assistant, Trainee
- **By keywords** — name, bio, skills

Results show: avatar, name, primary role, location, availability status (green/yellow/red dot), credit count, endorsement count.

### 8.7 Availability Management

Every professional can set availability blocks:

| Status | Meaning | Visual |
|--------|---------|--------|
| **Available** | Open for work | Green dot (pulsing) |
| **Soft Hold** | Tentatively reserved but not confirmed | Yellow dot |
| **Firm Hold** | Reserved, awaiting contract | Yellow dot |
| **Booked** | Confirmed and committed | Red dot |

Availability is searchable by date range and location, so hiring managers can filter for people who are actually free.

### 8.8 Document Vault

Every project has a secure document vault for:
- Contracts and deal memos
- Call sheets and sides
- NDAs
- Chain-of-title documents
- Insurance certificates

Documents have confidentiality levels: Public, Project Members, Restricted, Top Secret. Access is controlled per-user with read/write/sign permissions.

---

## 9. User Journeys

### Journey 1: Actor Looking for Work

1. Signs up → Free tier
2. Onboarding: selects "Talent" role (under Above-the-Line group... wait, talent would typically be in a general category). Actually selects from available roles
3. Builds profile: headshot, reel link, bio, location (Los Angeles), training
4. Sets availability: Available March 1 – June 30, LA area
5. Browses casting breakdowns → finds a role matching their type
6. Submits to breakdown with headshot and reel
7. Gets audition callback → attends virtual audition
8. Shortlisted → Put on Firm Hold
9. Booked → Assignment created
10. After production: receives endorsements from Director and Casting Director
11. Worked-with edges connect them to 30+ crew members from the project

### Journey 2: Producer Staffing a Feature Film

1. Signs up → Hiring Pro tier ($149/mo)
2. Onboarding: selects "Producer" role
3. Creates a Project: "Midnight Runner" — Feature Film, Pre-Production, $2M budget, Atlanta
4. Invites Line Producer (existing FrameOne member) with full authority
5. Line Producer posts requisitions for Department Heads:
   - DP, Production Designer, 1st AD, Production Sound Mixer, Costume Designer
6. Applications come in → LP reviews, shortlists, sends offers
7. DP is hired → DP now has authority to post requisitions for camera crew
8. DP posts: Camera Operator, 1st AC, Gaffer, Key Grip, DIT
9. Process cascades through all departments
10. 45 crew members hired through the platform
11. Production completes → 45 × 44 / 2 = 990 worked-with edges created
12. Trust network grows exponentially

### Journey 3: Catering Company Getting Booked

1. Signs up → Free tier (vendor)
2. Onboarding: selects "Catering" role (vendor type)
3. Builds profile: service region (Georgia), capacity (up to 200), mobile kitchen specs, dietary capabilities
4. Appears in search when producers look for catering in Atlanta
5. Gets booked for "Midnight Runner" project
6. After providing meals for 6 weeks, submits invoice through platform
7. Producer's Production Accountant approves the invoice
8. Payout processed through Stripe Connect
9. Receives endorsement from UPM for reliability

---

## 10. Payment System

### Two-Lane Architecture

FrameOne implements payments in two phases to manage complexity and compliance risk:

**Lane 1: Vendor Payouts (MVP — built now)**
```
Vendor submits Invoice
  → Line Items (description, quantity, unit price, amount)
  → Attached to a Project
  → Total amount + currency

Production Accountant or LP reviews
  → Approves or Disputes

On Approval:
  → Stripe Connect processes payout to vendor's connected account
  → Audit event logged
  → Payout status tracked: Pending → Processing → Completed
```

This handles: catering, equipment rental, location fees, transportation, craft services, etc.

**Lane 2: Labor Payroll (Phase 3 — future)**
```
Crew member completes work period
  → Timesheet submitted
  → Rate applied from assignment terms

Production Accountant verifies
  → Tax withholding calculated (jurisdiction-dependent)
  → Payrun batch created

Payroll processed
  → Compliance with W-2/1099 requirements
  → Tax documents generated
```

This is significantly more complex due to employment law, tax withholding, union requirements, and state-by-state regulations. We build Lane 1 first and add Lane 2 once we have legal counsel on compliance.

### Why Stripe Connect?

- **Industry standard** for marketplace payments
- **Handles onboarding** — vendors connect their bank accounts through Stripe's hosted flow
- **PCI compliant** — we never touch or store credit card numbers
- **Global** — supports 40+ countries
- **Transparent fees** — 2.9% + $0.30 per transaction (we can add a platform fee on top)

---

## 11. Trust & Reputation System

### The Problem with Self-Reported Resumes

On LinkedIn, anyone can claim "10 years of experience as a DP." There's no verification. In the entertainment industry, this is dangerous — an unqualified grip can cause a safety incident that shuts down production.

### FrameOne's Trust Model

**Layer 1: Worked-With Graph**

When two people are assigned to the same project, a **WorkedWithEdge** is automatically created with:
- The project they worked on
- Each person's role on that project
- The date range

This is **unfakeable** — you can't create a worked-with edge without both people being assigned to the same project by someone with hiring authority.

**Layer 2: Endorsements**

After working together, professionals can endorse each other. Endorsements are:
- **Role-scoped** — a DP endorses a Gaffer for lighting skill, not for catering
- **Type-categorized** — Skill, Professionalism, Reliability, Creativity, Leadership
- **Optional text and rating** — 1-5 stars with written comments
- **Project-linked** — endorsements can reference the specific project

**Layer 3: Verified Credits**

Every project assignment creates a credit on the professional's profile. Over time, this builds an **IMDb-like credit history** that's verified by the hiring chain, not self-reported.

**The Network Effect**

As more productions run through FrameOne:
- More worked-with edges are created
- Search results can be ranked by "degrees of connection" to the searcher
- A Producer can see: "This Gaffer was endorsed by my DP from last project" — instant trust signal
- The platform becomes more valuable as more people use it (classic network effect)

---

## 12. Technical Architecture Overview

### Tech Stack (for non-engineers)

| Component | Technology | What It Does |
|-----------|-----------|-------------|
| **Frontend** | Next.js + React | What users see and click on. Renders pages, forms, dashboards. |
| **Backend** | Next.js API Routes | Handles business logic. Processes requests, enforces rules, talks to database. |
| **Database** | PostgreSQL | Stores all data — users, roles, projects, applications, payments, etc. |
| **Authentication** | NextAuth | Manages login sessions. Encrypts passwords. Handles "remember me." |
| **Payments** | Stripe Connect | Processes vendor payouts. Handles bank account connections. |
| **Styling** | Tailwind CSS | Makes everything look good. Dark theme with indigo/gold brand colors. |
| **Validation** | Zod | Checks that data is correct before saving. Prevents invalid inputs. |
| **Language** | TypeScript | JavaScript with type safety. Catches bugs before they reach users. |

### Why We Chose This Stack

1. **Next.js** — Used by Netflix, TikTok, Hulu, Notion. Handles both the website and the API in one codebase.
2. **PostgreSQL** — The world's most advanced open-source database. Perfect for the complex relationships between users, roles, projects, and credits.
3. **Stripe Connect** — The industry standard for marketplace payments. Uber, Lyft, Shopify, and DoorDash all use it.
4. **Tailwind CSS** — Fastest way to build beautiful, responsive UIs. No separate design files needed.

### Why NOT Laravel (Ralph's Original Choice)

Ralph's original site was built with Laravel (PHP). Here's why we moved to Next.js:

| Aspect | Laravel (Ralph's) | Next.js (Ours) |
|--------|-------------------|----------------|
| Language | PHP | TypeScript |
| Real-time features | Requires separate WebSocket server | Built-in |
| API + Frontend | Separate layers | Unified in one codebase |
| Deployment | Cloudways only | Vercel, AWS, Railway, self-hosted |
| Type safety | None built-in | Full TypeScript |
| Scaling | PHP workers (vertical) | Serverless (horizontal) |
| Developer pool | Shrinking | Growing rapidly |

---

## 13. Site Map & Page Structure

### Public Pages (No Login Required)

| Page | URL | Purpose |
|------|-----|---------|
| **Landing Page** | `/` | Marketing page. Hero, features, role showcase, pricing, CTAs. |
| **Login** | `/auth/login` | Email + password login form. |
| **Register** | `/auth/register` | Account creation form. |

### Onboarding (Requires Login, Before Dashboard Access)

| Page | URL | Purpose |
|------|-----|---------|
| **Onboarding Wizard** | `/onboarding` | 4-step process: Choose Roles → Build Profiles → Select Plan → Welcome |

### Authenticated Pages (Main App)

| Page | URL | Purpose |
|------|-----|---------|
| **Dashboard** | `/dashboard` | Home. Stats, quick actions, recent activity. |
| **Discover** | `/discover` | Search talent, crew, vendors by role, location, availability. |
| **Projects** | `/projects` | List of user's projects. Create new project. |
| **Project Detail** | `/projects/[id]` | Project management: members, requisitions, casting, documents. |
| **Casting** | `/casting` | Browse casting breakdowns. Submit to roles. |
| **Messages** | `/messages` | Notification-based communication. |
| **My Profiles** | `/profile/edit` | Edit role profiles, portfolio, reel, bio. |
| **Availability** | `/availability` | Set and manage availability calendar. |
| **Applications** | `/applications` | Track job applications and their status. |
| **Payments** | `/payments` | Payment history and Stripe Connect setup. |
| **Invoices** | `/invoices` | Submit and track invoices. |
| **Settings** | `/settings` | Account settings, billing, preferences. |

---

## 14. API Endpoints

The backend exposes 24 API endpoints that handle all data operations:

### Authentication
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST/GET | `/api/auth/[...nextauth]` | Login, session management |

### User
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| GET/PATCH | `/api/users/me` | Get or update current user |

### Onboarding
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| POST | `/api/onboarding/complete` | Save role selections, profiles, plan |

### Projects
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| GET/POST | `/api/projects` | List or create projects |
| GET/PATCH/DELETE | `/api/projects/[id]` | Get, update, or delete a project |
| GET/POST | `/api/projects/[id]/members` | List or add project members |

### Hiring
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| GET/POST | `/api/requisitions` | List or create job requisitions |
| GET/PATCH | `/api/requisitions/[id]` | Get or update a requisition |
| GET/POST | `/api/applications` | List or submit applications |
| GET/PATCH | `/api/applications/[id]` | Get or update application status |
| POST | `/api/offers` | Create an offer |
| GET/PATCH | `/api/offers/[id]` | Get or respond to an offer |

### Profiles & Trust
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| GET/POST | `/api/profiles` | List or add role profiles |
| GET/PATCH | `/api/profiles/[id]` | View or edit a profile |
| GET/POST | `/api/endorsements` | List or create endorsements |
| GET/POST/DELETE | `/api/availability` | Manage availability blocks |

### Casting
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| GET/POST | `/api/casting/breakdowns` | List or create casting breakdowns |
| GET/PATCH | `/api/casting/breakdowns/[id]` | View or update a breakdown |
| GET/POST | `/api/casting/submissions` | List or submit to breakdowns |

### Finance
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| GET/POST | `/api/invoices` | List or create invoices |
| GET/PATCH | `/api/invoices/[id]` | View or approve/reject invoices |

### Discovery
| Method | Endpoint | What It Does |
|--------|---------|-------------|
| GET | `/api/search` | Search profiles, projects, requisitions |
| GET | `/api/taxonomy` | Get all department groups and roles |

---

## 15. Database Structure

The platform stores data in **25 interconnected tables** across 7 domains:

### Domain Map

```
IDENTITY (who you are)
  ├── users — login credentials, name, avatar
  ├── accounts — billing entity (individual or company)
  └── memberships — subscription tier and status

ROLES (what you do)
  ├── taxonomy_groups — 9 department categories
  ├── roles — 43 specific positions
  ├── role_profiles — your profile for each role
  └── role_profile_fields — extensible per-role data

PROJECTS (where you work)
  ├── projects — productions with dates, budget, locations
  ├── project_members — who's on the project and their authority
  ├── requisitions — job openings within a project
  ├── applications — people applying to requisitions
  ├── offers — terms proposed to applicants
  ├── project_assignments — confirmed team members
  └── credits — verified work history entries

TRUST (who vouches for you)
  ├── worked_with_edges — verified collaboration connections
  ├── endorsements — skill/quality ratings from collaborators
  └── availability — schedule and hold status

CASTING (talent-specific workflow)
  ├── breakdowns — character/role descriptions
  ├── submissions — talent applying to breakdowns
  ├── auditions — scheduled audition sessions
  └── shortlist_entries — ranked candidates

PAYMENTS (money movement)
  ├── invoices — vendor bills with line items
  └── payouts — processed payments

SYSTEM
  ├── documents — uploaded files with access control
  ├── document_access — per-user file permissions
  └── audit_events — immutable activity log
```

---

## 16. Security & Privacy

### Authentication
- Passwords are hashed with **bcrypt** (12 rounds) — even if the database is breached, passwords cannot be recovered
- Sessions use **JWT tokens** stored in HTTP-only cookies
- Session duration: 30 days with automatic refresh

### Authorization
- Every API endpoint checks authentication before processing
- Project-level permissions are enforced through **authority flags**:
  - `canHire` — can post requisitions and send offers
  - `canApproveOffers` — can approve offers above a threshold
  - `canApproveInvoices` — can approve vendor payments
  - `canManageDocs` — can upload and manage project documents

### Payment Security
- **PCI DSS compliant** through Stripe — we never see, store, or transmit credit card numbers
- All payment operations are logged in the audit trail
- Invoice approvals require authorized users

### Data Protection
- Document confidentiality levels prevent unauthorized access
- Sensitive personal data (measurements, IDs) stored in encrypted fields
- All database queries use parameterized inputs (SQL injection protection)
- Input validation on every API endpoint (XSS/injection prevention)

### Audit Trail
- Every sensitive operation creates an immutable **AuditEvent** record:
  - Who did it (actor user ID)
  - What they did (action)
  - What they did it to (entity type + ID)
  - When (timestamp)
  - Additional context (metadata JSON)

---

## 17. Development Roadmap

### Phase 1: MVP (Current — What's Built)

**Status: Complete**

- User registration and authentication
- Multi-role onboarding wizard (4 steps)
- 43-role taxonomy across 9 departments
- 5 membership tiers
- Project creation and management
- Requisition/application/offer hiring flow
- Casting breakdown/submission workflow
- Worked-with graph (auto-generated)
- Endorsement system (project-bound)
- Availability management (available/hold/booked)
- Universal search across profiles, projects, requisitions
- Vendor invoice/payout system (Stripe Connect)
- Document vault with confidentiality levels
- Audit event logging
- Landing page, dashboard, discover, projects pages
- Dark theme with indigo/gold brand

### Phase 2: Sticky Features (Next 2-3 months)

- **Call sheet creation and distribution** — AD and coordinator tools
- **E-signatures** — sign contracts and deal memos in-platform
- **Post-production pipeline** — editor and post supervisor workflows
- **Real-time messaging** — direct messages between professionals
- **Analytics dashboard** — time-to-fill, rehire rates, offer acceptance
- **Mobile optimization** — responsive improvements for on-set use
- **Department scheduling** — visual calendar per department per project

### Phase 3: Scale & Compliance (3-6 months)

- **Payroll integrations** — labor payment processing with tax compliance
- **Union verification** — optional IATSE/SAG-AFTRA roster checks
- **Fraud detection** — AI-powered scam and impersonation prevention
- **Enterprise SSO** — studio-grade single sign-on
- **Advanced search** — Elasticsearch with faceted filtering
- **API access** — public API for agency/studio integrations

### Phase 4: Intelligence (6-12 months)

- **AI-powered matching** — recommend crew based on worked-with graph and preferences
- **Predictive availability** — forecast who will be free based on project timelines
- **Market rate intelligence** — anonymous rate benchmarking by role and region
- **Production planning AI** — suggest department staffing based on script breakdown
- **Mobile app** — native iOS/Android for on-set use

---

## 18. Access & Login Information

### GitHub Repository

| Item | Value |
|------|-------|
| **Repository URL** | `https://github.com/addyanddaddy/TalentHub` |
| **Branch** | `main` |
| **Clone (SSH)** | `git clone git@github.com:addyanddaddy/TalentHub.git` |
| **Clone (HTTPS)** | `git clone https://github.com/addyanddaddy/TalentHub.git` |

### Technology Requirements

To run the platform locally, you need:

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 20+ | JavaScript runtime |
| **npm** | 9+ | Package manager |
| **PostgreSQL** | 15+ | Database |
| **Git** | Any | Version control |

### Environment Variables

Create a `.env` file in the project root with:

```
# Database connection
DATABASE_URL="postgresql://user:password@host:5432/frameone"

# NextAuth (authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Stripe (payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Quick Start Database Options

| Option | Cost | Setup Time | Best For |
|--------|------|-----------|----------|
| **Supabase** | Free tier | 5 minutes | Development and testing |
| **Neon** | Free tier | 5 minutes | Development and testing |
| **Railway** | $5/mo | 5 minutes | Staging and demos |
| **AWS RDS** | $15+/mo | 30 minutes | Production |

---

## 19. How to Deploy & Run

### Local Development

```bash
# 1. Clone the repository
git clone git@github.com:addyanddaddy/TalentHub.git
cd TalentHub

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# 4. Push database schema
npx prisma db push

# 5. Seed the database (creates all 43 roles)
npm run db:seed

# 6. Start development server
npm run dev

# 7. Open http://localhost:3000
```

### Production Deployment (Vercel)

```bash
# 1. Push to GitHub (already done)
# 2. Go to vercel.com → Import → select addyanddaddy/TalentHub
# 3. Add environment variables in Vercel dashboard
# 4. Deploy — Vercel handles the rest
```

### Database Management

```bash
# View database in browser GUI
npm run db:studio

# Apply schema changes
npm run db:push

# Re-seed roles (safe to run multiple times)
npm run db:seed

# Full reset (DESTROYS ALL DATA)
npm run db:reset
```

---

## 20. Competitive Landscape

| Platform | What It Does | Limitation vs FrameOne |
|----------|-------------|----------------------|
| **Backstage** | Actor casting, auditions | Talent only. No crew, no projects, no payments. |
| **Casting Networks** | Casting breakdowns, submissions | Casting only. No crew hiring, no project management. |
| **StaffMeUp** | Crew job board | Flat job listings. No departments, no authority chains, no trust graph. |
| **ProductionHUB** | Directory + job board | Directory only. No project management, no payments, no endorsements. |
| **LinkedIn** | Professional networking | Too generic. No department structure, no availability, no casting. |
| **IMDbPro** | Credits database + contacts | View-only credits. No hiring flow, no project management. |
| **FrameOne** | **Full ecosystem** | **All roles. Hiring flow. Casting. Payments. Trust network. Project management.** |

### Our Unfair Advantage

**The worked-with graph.** Every platform above is a directory or a job board. FrameOne builds a verifiable trust network that gets more valuable with every production. After 1,000 projects run through the platform, FrameOne will have a dataset of real industry relationships that no competitor can replicate.

---

## 21. Revenue Projections

### Conservative Model (Year 1)

| Segment | Users | Tier | Monthly Revenue |
|---------|-------|------|----------------|
| Free talent/crew | 20,000 | $0 | $0 |
| Pro Supply | 2,000 | $19 | $38,000 |
| Hiring Pro | 200 | $149 | $29,800 |
| Department Head | 500 | $49 | $24,500 |
| Agency/Studio | 20 | $499 | $9,980 |
| **Subscriptions** | | | **$102,280/mo** |
| Transaction fees (est.) | | 2.9% | ~$15,000/mo |
| **Total MRR** | | | **~$117,280/mo** |
| **Annual Run Rate** | | | **~$1.41M** |

### Path to 30,000 Active Members

| Quarter | Action | Projected Members |
|---------|--------|------------------|
| Q1 | Launch MVP, seed LA/Atlanta markets | 500 |
| Q2 | Add messaging, e-signatures, mobile | 2,000 |
| Q3 | Payroll integration, union features | 8,000 |
| Q4 | AI matching, mobile app, NYC/London | 15,000 |
| Q5-Q6 | Enterprise deals, API partnerships | 30,000 |

---

## 22. AI Integration

FrameOne integrates Claude AI (by Anthropic) directly into the platform. The AI handles five core functions: matching talent to jobs, understanding natural language searches, automatically categorizing member profiles, recommending crew from your network, and suggesting roles during signup. All of these work together to make the platform smarter than any job board or directory.

### Feature 1: Smart Match

When a Producer or Department Head posts a job requisition, they can click "Find Best Matches" and the AI analyzes every candidate in the system and ranks them by fit.

The AI looks at the requisition requirements (role, location, dates, rate, description) and compares them against every matching profile in the database. It considers availability (are they free during the shoot dates?), location (are they near the production?), experience (how many past projects and endorsements do they have?), and bio relevance (does their described experience match what the production needs?). It returns a ranked list with a match score from 0 to 100 and a written explanation for each recommendation.

Example: A Line Producer posts a requisition for a Gaffer in Atlanta, March 15 through April 30, at $650 per day. The AI scans all Gaffer profiles and returns something like: "Marcus Johnson, 95% match. Based in Atlanta, available March through May, 14 past projects, 8 endorsements from DPs. His bio mentions extensive experience with LED lighting on indie features, which aligns with this production's format."

### Feature 2: Natural Language Search

Instead of clicking through dropdown filters, users can type a search in plain English and the AI understands what they want.

The user types something like "find me a DP in Atlanta who's available in March and has worked on horror films." The AI parses that sentence and extracts the structured information: role is Director of Photography, location is Atlanta, available dates are March 2026, and the keyword is horror. Then it runs that structured query against the database and returns matching profiles.

Most people don't think in dropdown menus. They think in sentences. This makes the search feel like talking to an assistant rather than filling out a form. It also handles ambiguity. If someone types "camera guy in LA" the AI knows they mean Camera Operator in Los Angeles.

### Feature 3: Auto-Categorization

When a member writes their bio, the AI automatically extracts skills, genres, tools, and specialties and saves them as searchable tags on their profile.

A Gaffer writes in their bio: "15 years lighting features and episodic television. Experienced with ARRI SkyPanels, LED walls, and DMX programming. Specialize in horror and thriller atmospherics." The AI reads that and extracts skills (LED lighting, DMX programming, atmospheric lighting), genres (horror, thriller), tools (ARRI SkyPanel, LED wall), and specialties (atmospheric lighting, episodic television). These get saved as structured tags that make the profile show up in relevant searches even if someone doesn't search for the exact words in the bio.

Most professionals write bios in paragraph form. Without AI extraction, that information is locked in unstructured text and invisible to search. This makes every member's profile automatically more discoverable.

### Feature 4: Crew Recommendations

When a Producer or Department Head has a project with open positions, the AI looks at their professional network (people they have worked with on past projects) and recommends specific people for each open role.

The AI pulls the user's entire worked-with history from the platform — every person they have been on a project with, what role each person had, and how many endorsements they have received. Then it looks at the open requisitions on the current project and matches network contacts to open positions. It prioritizes people whose role directly matches the open position, who have more endorsements (indicating they are trusted and reliable), and who the user has personally collaborated with before (lower hiring risk).

This is how the industry actually works — people hire people they have worked with before. The AI just makes that process instant instead of requiring phone calls and text chains. It also surfaces connections the user might have forgotten about.

### Feature 5: Role Suggestion During Onboarding

When a new member signs up and goes through the onboarding wizard, they can describe what they do in their own words and the AI suggests which of the 43 platform roles they should select.

The user types something like "I work in camera departments, mostly pulling focus and operating on commercials, but I also do some DIT work on smaller shoots." The AI reads that and suggests First Assistant Camera (high confidence, they mentioned pulling focus), Camera Operator (medium confidence, they mentioned operating), and Digital Imaging Technician (medium confidence, they mentioned DIT work).

A new user looking at 43 roles across 9 departments can feel overwhelming. Not everyone knows the industry terminology, especially people earlier in their careers. This removes the friction from signup and makes sure people select the right roles so they show up in the right searches.

### How the AI Connects to the Platform

The AI is not a separate product. It is woven into the existing features:

The Discover page uses natural language search so members can find talent by typing instead of clicking filters.

The Requisition detail page has a "Find Best Matches" button that runs Smart Match and shows ranked candidates.

The Project dashboard has a "Recommended Crew" section that pulls from the user's network using Crew Recommendations.

The Profile edit page has an "Auto-tag my profile" button that runs Auto-Categorization on the bio.

The Onboarding wizard has an optional "Describe what you do" text field that runs Role Suggestion before showing the department and role picker.

### AI Cost Analysis

The AI is powered by Claude Sonnet, which provides fast response times (under 3 seconds) with high accuracy. All AI responses are returned as structured data that the platform processes directly.

At current API pricing, each AI call costs approximately $0.003 to $0.01. Even at 10,000 AI-assisted searches per month, the total cost would be under $100 per month. This is negligible compared to the platform's subscription revenue.

The AI features are optional. If the API key is not configured, every other feature on the platform works normally. The AI is an enhancement layer, not a dependency.

### Future AI Features (Phase 2 and 3)

Script Breakdown AI: Upload a screenplay and the AI analyzes it to suggest what departments and roles you will need to staff, with estimated headcount per department.

Schedule Optimization: AI suggests optimal shooting schedules based on crew availability windows and location constraints.

Rate Intelligence: Anonymous benchmarking that tells users "the average rate for a Gaffer in Atlanta is $575 to $700 per day" based on aggregated platform data.

Career Path AI: Suggests growth paths based on a member's current role and experience, like "based on your experience as a Key Grip with 8 projects, here is what it typically takes to move into a DP role."

Portfolio Matching: Using AI embeddings to find professionals with similar styles, specialties, or experience even when they describe their work differently.

---

*This document is confidential and intended for the FrameOne founding team. For the full technical specification, see the ARCHITECTURE.md document in the repository.*

---

Prepared by Brandon Bible, Technical Lead
March 9, 2026
