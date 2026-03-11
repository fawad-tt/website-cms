import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Populates default values for array fields when creating new page contents
 * This ensures that array fields with minRows requirements have default data
 */
export const populateDefaults: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if (operation !== 'create') {
    return data
  }

  if (!data.howItWorks?.steps || data.howItWorks.steps.length === 0) {
    data.howItWorks = {
      ...data.howItWorks,
      steps: [
        {
          heading: 'Enter Vehicle Details',
          paragraph:
            'Enter your vehicle information or tire size to find the perfect tires for your needs.',
        },
        {
          heading: 'Browse Tire Options',
          paragraph:
            'Browse our wide selection of premium tire brands and compare prices, ratings, and features.',
        },
        {
          heading: 'Choose Your Tires',
          paragraph: 'Select the tires that best fit your vehicle, budget, and driving needs.',
        },
        {
          heading: 'Book an Appointment',
          paragraph:
            'Choose a convenient time and location for professional tire installation at your nearest shop.',
        },
      ],
    }
  }

  if (!data.whyChooseUs?.items || data.whyChooseUs.items.length === 0) {
    data.whyChooseUs = {
      ...data.whyChooseUs,
      items: [
        {
          heading: 'Expert Guidance',
          paragraph:
            'Our knowledgeable staff provides personalized recommendations to help you find the perfect tires and services for your vehicle and driving needs.',
        },
        {
          heading: 'ASE Certified Technicians',
          paragraph:
            'Trust your vehicle to certified professionals who undergo rigorous training and maintain the highest standards of automotive service excellence.',
        },
        {
          heading: 'Wide Tire Selection',
          paragraph:
            'Choose from an extensive inventory of premium tire brands and models, ensuring you get the right fit, performance, and value for your vehicle.',
        },
      ],
    }
  }

  if (!data.trustSection?.items || data.trustSection.items.length === 0) {
    data.trustSection = {
      ...data.trustSection,
      items: [
        {
          heading: 'Family Owned & Operated',
          paragraph:
            'As a family-owned business serving our community for over 20 years, we treat every customer like family and stand behind our work with pride.',
        },
        {
          heading: 'Transparent Pricing',
          paragraph:
            'No hidden fees or surprise charges. We provide upfront, honest pricing and detailed explanations of all recommended services.',
        },
        {
          heading: 'Warranty Protection',
          paragraph:
            'All our tire installations and services come with comprehensive warranty coverage for your peace of mind and long-term protection.',
        },
      ],
    }
  }

  return data
}
