# Aliens DNA

Public record for [aliensdna.com](https://aliensdna.com).

The live site is this landing page: the strand, the witness, the specimens, and the list.

## Point the domain

1. Import this repo on [Vercel](https://vercel.com/new).
2. In the project: **Settings → Domains → Add** `aliensdna.com` and `www.aliensdna.com`.
3. At [name.com](https://www.name.com) (where the domain was bought), turn off parking / Sedo and set DNS:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

DNS can take a few minutes to a few hours. Until those records change, the domain still shows the parking ad.
