# JAMStack personal blog - starter files


## Demos

- [Netlify](https://eleventy-base-blog.netlify.com/)
- [GitHub Pages](https://11ty.github.io/eleventy-base-blog/)
- [Remix on Glitch](https://glitch.com/~11ty-eleventy-base-blog)
.

## Getting Started

###  Install dependencies

```
npm install
```

### Edit \_data/metadata.json

###  Run Eleventy

```
npx @11ty/eleventy
```

Or build and host locally for local development

```
npx @11ty/eleventy --serve
```

Or build automatically when a template changes:

```
npx @11ty/eleventy --watch
```

Or in debug mode:

```
DEBUG=* npx @11ty/eleventy
```

### Implementation Notes

- `about/index.md` shows how to add a content page.
- `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
- Use the `eleventyNavigation` key in your front matter to add a template to the top level site navigation. For example, this is in use on `index.njk` and `about/index.md`.
- Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
- The `css` and `img` directories in the input directory will be copied to the output folder (via `addPassthroughCopy()` in the `.eleventy.js` file).

- This example uses three layouts:
  - `_includes/layouts/base.njk`: the top level HTML structure
  - `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  - `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
- `_includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `index.njk` has an example of how to use it.
