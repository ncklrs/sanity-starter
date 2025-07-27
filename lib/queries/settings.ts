import { groq } from 'next-sanity'

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    siteTitle,
    siteDescription,
    logo,
    favicon,
    defaultSeo,
    homepage->{
      _id,
      title,
      slug
    },
    mainNavigation[] {
      label,
      link,
      page->{
        _id,
        title,
        slug
      },
      children[] {
        label,
        link,
        page->{
          _id,
          title,
          slug
        }
      },
      openInNewTab,
      highlight
    },
    footerNavigation[] {
      label,
      link,
      page->{
        _id,
        title,
        slug
      },
      children[] {
        label,
        link,
        page->{
          _id,
          title,
          slug
        }
      },
      openInNewTab,
      highlight
    },
    socialMedia {
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      github
    },
    contact {
      email,
      phone,
      address
    },
    analytics {
      googleAnalyticsId,
      googleTagManagerId
    }
  }
` 