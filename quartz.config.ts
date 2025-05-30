import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const environment = process.env.NODE_ENV

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "ほこりログ",
    pageTitleSuffix: " | ほこりログ",
    enableSPA: false,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-XR5B2NH4S9",
    },
    locale: "ja-JP",
    baseUrl: "blog.tachibanayu24.com",
    ignorePatterns: ["private", "templates", ".obsidian", "static-images"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "M PLUS Rounded 1c",
          weights: [400, 500, 700],
        },
        body: {
          name: "M PLUS Rounded 1c",
          weights: [400, 500, 700],
        },
        code: {
          name: "JetBrains Mono",
          weights: [400, 500, 700],
        },
      },
      colors: {
        lightMode: {
          light: "#fff9f0",
          lightgray: "#f5e6d3",
          gray: "#d4c4b7",
          darkgray: "#8b7355",
          dark: "#5d4a3c",
          secondary: "#4e9e78",
          tertiary: "#f97316",
          highlight: "rgba(74, 190, 119, 0.15)",
          textHighlight: "rgba(74, 190, 119, 0.22)",
        },
        darkMode: {
          light: "#2c2420",
          lightgray: "#3d342e",
          gray: "#8b7355",
          darkgray: "#d4c4b7",
          dark: "#fff9f0",
          secondary: "#5ec990",
          tertiary: "#f97316",
          highlight: "rgba(104, 217, 137, 0.18)",
          textHighlight: "rgba(104, 217, 137, 0.25)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", openLinksInNewTab: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: environment === "localhost" ? [] : [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages({
        colorScheme: "lightMode",
        excludeRoot: true,
      }),
    ],
  },
}

export default config
