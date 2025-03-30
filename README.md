# Japanese Language
This _creatively_ named project is going to be a be a language learning tool that focuses
on manually translating texts. As you translate words & grammar points, you'll add your notes,
building your body of knowledge.

The translation process will involve breaking sentences down into grammar points, which
contain words, which will probably include kanji.

The notes we record on these items will not be exhaustive, as in that way lies madness.
Instead, we record everything relevant to the current use case (how it's used in the current
text). That way everything we learn is relevant. 

Eventually I'll add SRS flashcard system (look up [Anki](https://apps.ankiweb.net/) to see the
best example of this in action) to assist in commiting this knowledge to long-term memory.

The downside to this approach is that it's not really a tool for beginners, but that's okay
for now, because I'm writing it for me.

## Tech
- I'm using the Deno 2 runtime, mostly because I like what it's trying to achieve and I want to see how it's coming along
- My database and auth are provided by Supabase and until I get the API split out from this project and hosted, you're not going to be able to access it
- I'm using Storybook to assist with building, testing & (eventually) documenting my components.
- Vue 3, it's my jam

## Current plans
- Keep working out how the text annotator is supposed to work and how I'm going to represent
  everything in data.
- Write the API layer as and when it's needed
- Steadily putting a proper style system together instead of the fury road version that comes
  with the freestyle approach to R&D
- Write a documentation system for creating structured notes with columns, tables & stuff. This
  might just end up being a 3rd party markdown system in the end...
- Add a flashcard system using anki's open source engine

## Future plans
- Update the DB in Supabase so the tables match the new object types
- Separate out the API layer so that I can deploy it
- Getting my env file keys & passwords into some flavor of secret manager
- Flesh out the user management system/profile, because it's super bare bones right now
- Add support for 3rd party login
- Look into integrations with Anki, to see if I can take the flashcards offline

## Running the project
1. Add a dotenv file
```dotenv
VITE_SUPABASE_ANON_KEY="[big long random string]"
VITE_SUPABASE_URL="https://[Supabase ID].supabase.co"
VITE_SUPABASE_ID="[bunch of random letters]"
```
2. Install deno ([docs](https://docs.deno.com/runtime/))
3. Install the packages
```shell
deno install
```
4. Run the project
```shell
deno deno run dev:vite
```
5. Run storybook
```shell
npm deno run storybook
```