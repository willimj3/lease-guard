# LeaseGuard

A residential lease risk assessment tool that combines pattern-matching analysis with AI-powered review via the Claude API.

## Features

- **Pattern-Matching Analysis** — Instantly scans lease text for 10 common tenant-unfriendly provisions (excessive late fees, insufficient entry notice, broad indemnification, mandatory arbitration, and more)
- **AI Deep Analysis** — Sends the lease to Claude for a detailed, plain-English legal review with severity ratings and negotiation suggestions
- **File Upload** — Drag-and-drop or browse to upload `.txt`, `.pdf`, or `.docx` lease files
- **Risk Dashboard** — Summary of high/medium severity findings with an overall risk verdict

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- An [Anthropic API key](https://console.anthropic.com/) for AI analysis

### Installation

```bash
git clone https://github.com/willimj3/lease-guard.git
cd lease-guard
npm install
```

### Configuration

Create a `.env` file in the project root:

```
ANTHROPIC_API_KEY=your-api-key-here
```

### Running

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload or paste** a residential lease agreement
2. Click **Analyze Lease** for instant pattern-matching results
3. Click **AI Deep Analysis** for a comprehensive Claude-powered review

## Pattern-Matching Checks

| # | Check | Severity |
|---|-------|----------|
| 1 | Late fees exceeding 5% of monthly rent | High |
| 2 | Landlord entry without 24-hour notice | High |
| 3 | Tenant responsible for all/structural repairs | High |
| 4 | Security deposit exceeding 2 months' rent | Medium |
| 5 | Auto-renewal with less than 30-day opt-out | Medium |
| 6 | Broad indemnification / hold-harmless clauses | High |
| 7 | Jury trial waiver / mandatory arbitration | High |
| 8 | Non-refundable fees beyond application fees | Medium |
| 9 | Early termination penalty exceeding 2 months' rent | Medium |
| 10 | Landlord can change terms with less than 30 days' notice | High |

## Deploy to Vercel

1. Install the [Vercel CLI](https://vercel.com/docs/cli):
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set your API key in the Vercel dashboard under **Settings > Environment Variables**:
   ```
   ANTHROPIC_API_KEY=your-api-key-here
   ```

4. Redeploy for the env var to take effect:
   ```bash
   vercel --prod
   ```

## Tech Stack

- **Frontend** — HTML, CSS, JavaScript (single-page, no build step)
- **Backend** — Node.js, Express
- **AI** — Anthropic Claude API (claude-sonnet-4-5-20250929)
- **File Parsing** — PDF.js (PDF), Mammoth.js (DOCX)

## Disclaimer

This tool is for informational purposes only and does not constitute legal advice. Always consult a licensed attorney before signing a lease agreement.
