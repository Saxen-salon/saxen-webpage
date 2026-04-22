---
description: Build, commit, and push all changes to deploy the website
---

Save all changes and publish them to the live website.

Follow these steps in order:

1. Run `npm run build` to verify everything compiles correctly. This typically takes 30-60 seconds — tell the user you're waiting. If the build fails, stop here and explain the problem in simple terms.

2. Run `git status` and `git diff --stat` to see what changed.

3. Write a short description of the changes (in English, for the commit message).

4. Run `git add -A` to stage all changes.

5. Create a commit: `git commit -m "your description here"`

6. Run `git push` to push the code to GitHub.

7. Check if Vercel auto-deploys are connected: run `vercel inspect 2>/dev/null`. 
   - If it shows a recent deployment triggered by git → auto-deploys are working. Tell the user the site will update in 1-2 minutes.
   - If not (or if the command fails) → run `vercel --prod` to deploy directly. Tell the user the deploy is in progress.

8. Finish by telling the user:
   - What was saved and published
   - That the website will be updated within 1-2 minutes
   - That they can reload the site to see the changes
