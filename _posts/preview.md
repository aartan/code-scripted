---
title: "Preview Mode for Static Generation"
excerpt: "Learn how to use Preview Mode in Next.js to enable live previews of your content before it's published, combining the benefits of static generation with real-time content editing."
coverImage: "/assets/blog/preview/cover.jpg"
date: "2024-05-18T05:35:07.322Z"
author:
  name: Abdifatah M. Artan
  picture: "/assets/blog/authors/me.jpeg"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

Static generation is a powerful feature in Next.js that allows you to build highly performant and SEO-friendly websites. However, one challenge that often arises with static sites is the need to preview content changes before they go live. This is where **Preview Mode** comes into play. Preview Mode in Next.js allows you to view and interact with content changes in real-time, even when using static generation.

In this post, we'll explore how Preview Mode works in Next.js and how it can help you create a more dynamic and flexible content editing experience.

## Why Use Preview Mode?

Preview Mode is particularly useful in scenarios where content is managed by non-developers, such as in a CMS (Content Management System). It allows content editors to see their changes in the context of the site before those changes are published to all users. This capability is crucial for ensuring that the final content looks and behaves as expected without needing to wait for a full site rebuild.

### Key Benefits:

1. **Real-Time Content Editing:** Editors can make changes in a CMS and see those changes reflected immediately on the site, without needing to deploy the site or rebuild the static pages.
2. **Enhanced Collaboration:** Developers and content editors can work together more effectively, with editors able to preview changes as they make them.
3. **Reduced Errors:** By previewing changes before they go live, you can catch and fix issues early, reducing the likelihood of publishing errors.

## How to Implement Preview Mode in Next.js

Setting up Preview Mode in Next.js involves a few key steps. You'll need to create an API route to enable preview mode, fetch the draft content from your CMS, and then render the page in preview mode. Here’s a basic implementation:

### Step 1: Create an API Route

First, create an API route that enables preview mode. This route can be triggered by a CMS when a content editor wants to preview their changes.

```javascript
// pages/api/preview.js
export default function handler(req, res) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path specified in the query parameters
  const { slug = "" } = req.query;
  res.redirect(`/${slug}`);
}
```

### Step 2: Modify getStaticProps

In your page component, modify getStaticProps to check if the page is in preview mode. If it is, fetch the draft content instead of the published content.

```javascript
export async function getStaticProps(context) {
  const { preview } = context;

  // Fetch draft content if in preview mode, otherwise fetch published content
  const res = await fetch(`https://example.com/api/content?preview=${preview}`);
  const data = await res.json();

  return {
    props: {
      content: data,
    },
  };
}
```

### Step 3: Render the Page in Preview Mode

Finally, ensure that your page renders the draft content when in preview mode.

```javascript
export default function Post({ content }) {
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
    </div>
  );
}
```

## Conclusion

Preview Mode in Next.js bridges the gap between static generation and dynamic content editing, allowing content creators to preview their changes in real-time before publishing. This feature enhances the flexibility and usability of static sites, making it easier to collaborate and maintain high-quality content. Whether you’re managing a blog, an e-commerce platform, or a corporate website, enabling Preview Mode in your Next.js project can greatly improve the content editing workflow and reduce the risk of publishing errors.

Start using Preview Mode in your Next.js projects to combine the best of static generation with real-time content updates!
