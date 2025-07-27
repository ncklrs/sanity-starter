import post from './post'
import page from './page'
import settings from './settings'
import seo from './objects/seo'
import llmMetadata from './objects/llmMetadata'
import blockContent from './objects/blockContent'
import navigationItem from './objects/navigationItem'

// Import modules
import heroModule from './modules/heroModule'
import textModule from './modules/textModule'
import imageModule from './modules/imageModule'
import galleryModule from './modules/galleryModule'
import ctaModule from './modules/ctaModule'
import testimonialModule from './modules/testimonialModule'
import faqModule from './modules/faqModule'

export const schemaTypes = [
  post, 
  page, 
  settings,
  seo, 
  llmMetadata, 
  blockContent,
  navigationItem,
  heroModule,
  textModule,
  imageModule,
  galleryModule,
  ctaModule,
  testimonialModule,
  faqModule,
]
