---
title: "Implementing Dark Mode in Your Next.js Application"
excerpt: "Learn how to add dark mode to your Next.js application, providing users with a customizable and visually appealing experience."
coverImage: "/assets/blog/ManualDarkMode.jpg"
date: "2024-08-24T05:35:07.322Z"
author:
  name: Abdifatah M. Artan
  picture: "/assets/blog/authors/me.jpeg"
ogImage:
  url: "/assets/blog/ManualDarkMode.jpg"
---

Dark mode has become increasingly popular, offering users a visually appealing alternative to the traditional light theme. Adding dark mode to your Next.js application can enhance user experience and make your site more accessible.

In this article, we’ll walk through the steps to implement dark mode in a Next.js application, using both CSS and JavaScript.

## Why Implement Dark Mode?

Dark mode not only reduces eye strain in low-light conditions but also allows users to personalize their browsing experience. Many users prefer dark mode for its aesthetic appeal and the reduced power consumption on OLED screens.

### Key Benefits of Dark Mode:

1. **Improved Accessibility:** Provides a more comfortable viewing experience for users sensitive to bright light.
2. **User Preference:** Allows users to choose their preferred theme, enhancing user satisfaction.
3. **Modern Look:** Gives your application a sleek, modern appearance.

## Implementing Dark Mode with CSS Variables

One way to implement dark mode is by using CSS variables to define your color themes. Here’s an example:

```css
:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

.dark-mode {
  --background-color: #000000;
  --text-color: #ffffff;
}
```

In your component, you can toggle the dark mode class based on user preference:

```javascript
import { useState } from "react";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <h1>Welcome to My Site</h1>
    </div>
  );
}
```

Using JavaScript to Detect User Preference
You can also detect the user’s system preference for dark mode using JavaScript:

```javascript
useEffect(() => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  setDarkMode(prefersDarkMode);
}, []);
```

This code automatically applies the dark mode based on the user’s system settings.

## Conclusion

Adding dark mode to your Next.js application is a great way to enhance user experience and modernize your site’s appearance. By implementing a dark mode toggle, you give users the flexibility to choose the theme that suits them best, improving accessibility and engagement.
