# Privacy by design

This portfolio and its linked projects may handle sensitive data
(CVs, contact details, job descriptions, uploaded documents).

- Store only the minimum data required for the feature to work.
- Never upload or store passport, ID, or right-to-work documents in any
  demo.
- Provide delete controls for any user-uploaded content.
- Public/demo deployments use fake sample data only.
- Secrets stay server-side and out of version control (see `.env.example`
  and `.gitignore`).
- Database access is protected with Supabase Row Level Security before any
  real user data is introduced — verified by testing that one user cannot
  read another user's rows.
