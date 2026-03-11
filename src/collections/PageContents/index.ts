import type { CollectionConfig } from 'payload'
import { isAdmin, canUpdateSiteContent, isAdminOrHasSiteAccess } from '../../access'
import { validateUniquePageContents } from './hooks/validateUniquePageContents'
import { populateDefaults } from './hooks/populateDefaults'
import { selectedSiteOrGlobalFilter } from '../../utils/filters'

export const PageContents: CollectionConfig = {
  slug: 'page-contents',
  admin: {
    useAsTitle: 'site',
    defaultColumns: ['site', 'updatedAt'],
    description: 'Manage page contents for a site',
  },
  access: {
    read: isAdminOrHasSiteAccess,
    create: canUpdateSiteContent,
    update: canUpdateSiteContent,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [populateDefaults, validateUniquePageContents],
  },
  fields: [
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
      unique: true,
      index: true,
      label: 'Site',
      admin: {
        description:
          'Select the site this page content belongs to. Each site can only have one page contents record.',
      },
    },
    {
      name: 'homeHero',
      type: 'group',
      label: 'Home Page Hero Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Your Trusted Tire & Auto Service Experts',
          admin: {
            description: 'Main heading for the home page hero section',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          defaultValue:
            'Quality tires, expert service, and unbeatable prices. We keep your vehicle running smoothly and safely on the road.',
          admin: {
            description: 'Paragraph text for the home page hero section',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          filterOptions: selectedSiteOrGlobalFilter,
          admin: {
            description: 'Background image for the home page hero section (filtered by site)',
          },
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          required: true,
          label: 'Overlay Opacity',
          min: 0,
          max: 100,
          defaultValue: 50,
          admin: {
            description:
              'Overlay opacity percentage (0-100). Higher values create a darker overlay.',
            condition: (data, siblingData) => Boolean(siblingData?.backgroundImage),
          },
        },
      ],
    },
    {
      name: 'aboutUs',
      type: 'group',
      label: 'About Us',
      fields: [
        {
          name: 'cta',
          type: 'radio',
          label: 'Call to Action',
          options: [
            { label: 'Shop for Tires', value: 'shopTires' },
            { label: 'Schedule Service', value: 'scheduleService' },
            { label: 'Get a Quote', value: 'getQuote' },
          ],
          defaultValue: 'scheduleService',
          admin: {
            description: 'Select which action button to display for about us',
          },
        },
        {
          name: 'section',
          type: 'group',
          label: 'About Us Section',
          admin: {
            description: 'Content for the about us section on homepage',
          },
          fields: [
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Our Story',
              admin: {
                description: 'Tagline for the about us section',
              },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'About Our Tire Shop',
              admin: {
                description: 'Heading for the about us section',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                'With years of experience serving the community, we pride ourselves on delivering exceptional tire and automotive services. Our skilled technicians are dedicated to keeping you safe on the road with quality products and honest, reliable service.',
              admin: {
                description: 'Paragraph text for the about us section',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description: 'Image for the about us section',
              },
            },
          ],
        },
        {
          name: 'hero',
          type: 'group',
          label: 'About Us Page Hero',
          admin: {
            description: 'Content for the hero section on the about us page',
          },
          fields: [
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Who We Are',
              admin: {
                description: 'Tagline for the about us page hero section',
              },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'Your Trusted Automotive Partner',
              admin: {
                description: 'Heading for the about us page hero section',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                'For over decades, we have been committed to providing our community with top-quality tire services and automotive care. Our family-owned business combines expertise, integrity, and a passion for excellence in everything we do.',
              admin: {
                description: 'Paragraph text for the about us page hero section',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description: 'Image for the about us page hero section',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'blog',
      type: 'group',
      label: 'Blog',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          defaultValue: 'Tire Tips',
          admin: {
            description: 'Tagline for the blog section on homepage',
          },
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Expert Advice & Tire Care Tips',
          admin: {
            description: 'Heading used for both the blog page and blog section on homepage',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          label: 'Paragraph',
          defaultValue:
            'Stay informed with our latest articles on tire maintenance, seasonal driving tips, and automotive care advice from our expert technicians.',
          admin: {
            description: 'Paragraph text used for both the blog page and blog section on homepage',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          filterOptions: selectedSiteOrGlobalFilter,
          admin: {
            description: 'Image used for the featured image on the blog page',
          },
        },
      ],
    },
    {
      name: 'locations',
      type: 'group',
      label: 'Locations',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Visit Us Today',
          admin: {
            description:
              'Heading used for both the locations page and locations section on homepage',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          defaultValue:
            'Find a location near you. Our convenient tire shop locations are ready to serve all your automotive needs with fast, friendly service.',
          admin: {
            description:
              'Paragraph text used for both the locations page and locations section on homepage',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Get in Touch',
          admin: {
            description: 'Heading used for both the contact page and contact section on homepage',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          defaultValue:
            'Have questions about our services or need expert advice? Our friendly team is here to help. Contact us today for personalized assistance.',
          admin: {
            description:
              'Paragraph text used for both the contact page and contact section on homepage',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          filterOptions: selectedSiteOrGlobalFilter,
          admin: {
            description: 'Image used for both the contact page and contact section on homepage',
          },
        },
      ],
    },
    {
      name: 'faq',
      type: 'group',
      label: 'FAQ',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Frequently Asked Questions',
          admin: {
            description: 'Heading used for both the FAQ page and FAQ section on homepage',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          defaultValue:
            "Find answers to common questions about our tire services, pricing, warranties, and more. We're here to make your experience as smooth as possible.",
          admin: {
            description: 'Paragraph text used for both the FAQ page and FAQ section on homepage',
          },
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      label: 'Services',
      fields: [
        {
          name: 'cta',
          type: 'radio',
          label: 'Call to Action',
          options: [
            { label: 'Shop for Tires', value: 'shopTires' },
            { label: 'Schedule Service', value: 'scheduleService' },
            { label: 'Get a Quote', value: 'getQuote' },
          ],
          defaultValue: 'scheduleService',
          admin: {
            description: 'Select which action button to display for services',
          },
        },
        {
          name: 'section',
          type: 'group',
          label: 'Services Section',
          admin: {
            description: 'Content for the services section',
          },
          fields: [
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Complete Auto Care',
              admin: {
                description: 'Tagline for the services section',
              },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'Professional Tire & Automotive Services',
              admin: {
                description: 'Heading for the services section ',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                'From tire installation and rotation to alignments and repairs, our certified technicians provide comprehensive automotive services to keep your vehicle performing at its best.',
              admin: {
                description: 'Paragraph text for the services section',
              },
            },
          ],
        },
        {
          name: 'hero',
          type: 'group',
          label: 'Services Page Hero',
          admin: {
            description: 'Content for the hero section on the services page',
          },
          fields: [
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Complete Auto Care',
              admin: {
                description: 'Tagline for the services page hero section',
              },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'Expert Automotive Services You Can Trust',
              admin: {
                description: 'Heading for the services page hero section',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                'Our full-service tire and automotive center offers everything you need to keep your vehicle running smoothly. Experience quality workmanship, competitive pricing, and exceptional customer service.',
              admin: {
                description: 'Paragraph text for the services page hero section',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description: 'Image for the services page hero section',
              },
            },
          ],
        },
        {
          name: 'ctaSection',
          type: 'group',
          label: 'Services CTA Section',
          admin: {
            description: 'Call to action section content for services',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'Ready to Get Started?',
              admin: {
                description: 'Heading for the services CTA section',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                'Schedule your service appointment today or get a free quote. Our team is ready to help you with all your tire and automotive needs.',
              admin: {
                description: 'Paragraph text for the services CTA section',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      label: 'Reviews',
      fields: [
        {
          name: 'cta',
          type: 'radio',
          label: 'Call to Action',
          options: [
            { label: 'Shop for Tires', value: 'shopTires' },
            { label: 'Schedule Service', value: 'scheduleService' },
            { label: 'Get a Quote', value: 'getQuote' },
          ],
          defaultValue: 'scheduleService',
          admin: {
            description: 'Select which action button to display for reviews',
          },
        },
        {
          name: 'section',
          type: 'group',
          label: 'Reviews Section',
          admin: {
            description: 'Content for the reviews section',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'What Our Customers Say',
              admin: {
                description: 'Heading for the reviews section',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                'Discover why thousands of customers trust us with their tire and automotive needs. Read real reviews from drivers in your community.',
              admin: {
                description: 'Paragraph text for the reviews section',
              },
            },
          ],
        },
        {
          name: 'hero',
          type: 'group',
          label: 'Reviews Page Hero',
          admin: {
            description: 'Content for the hero section on the reviews page',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'Customer Reviews & Testimonials',
              admin: {
                description: 'Heading for the reviews page hero section',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                "See what our customers are saying about their experience with our tire services, quality products, and exceptional customer care. We're proud to serve our community with honesty, expertise, and dedication.",
              admin: {
                description: 'Paragraph text for the reviews page hero section',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'howItWorks',
      type: 'group',
      label: 'How It Works',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Discover just how simple tire shopping can be!',
          admin: {
            description: 'Main heading for the how it works section',
          },
        },
        {
          name: 'steps',
          type: 'array',
          label: 'Steps',
          minRows: 4,
          maxRows: 4,
          admin: {
            description: 'Four steps explaining how the process works',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Step Heading',
              admin: {
                description: 'Heading for this step',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Step Description',
              admin: {
                description: 'Description text for this step',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Step Image',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description: 'Image/icon for this step',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      type: 'group',
      label: 'Certifications',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          defaultValue: 'Certified Excellence',
          admin: {
            description: 'Tagline for the certifications section',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'ASE Certified Technicians',
          admin: {
            description: 'Heading for the certifications section',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          defaultValue:
            'Our team of ASE certified technicians brings expertise and professionalism to every service. With rigorous training and certification standards, we ensure your vehicle receives the highest quality care using industry best practices.',
          admin: {
            description: 'Paragraph text for the certifications section',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Certificate Image',
          filterOptions: selectedSiteOrGlobalFilter,
          admin: {
            description: 'Certification badge or logo image (e.g., ASE certification badge)',
          },
        },
      ],
    },
    {
      name: 'rebates',
      type: 'group',
      label: 'Rebates',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Current Tire Rebates & Special Offers',
          admin: {
            description: 'Main heading for the rebates section',
          },
        },
        {
          name: 'paragraph',
          type: 'text',
          required: true,
          label: 'Paragraph',
          defaultValue:
            'Save money on quality tires with our latest manufacturer rebates and special promotions. Check back regularly for new offers from top tire brands.',
          admin: {
            description: 'Paragraph text for the rebates section',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          required: true,
          label: 'Tag Line',
          defaultValue: 'Limited Time Offers',
          admin: {
            description: 'Tag line for the rebates section',
          },
        },
      ],
    },
    {
      name: 'whyChooseUs',
      type: 'group',
      label: 'Why Choose Us',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Why Choose Our Auto Shop',
          admin: {
            description: 'Main heading for the why choose us section',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          filterOptions: selectedSiteOrGlobalFilter,
          admin: {
            description: 'Image for the why choose us section',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'Three items explaining why customers should choose your auto shop',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Item Heading',
              admin: {
                description: 'Heading for this item',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Item Description',
              admin: {
                description: 'Description text for this item',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'shopForTires',
      type: 'group',
      label: 'Shop for Tires',
      fields: [
        {
          name: 'hero',
          type: 'group',
          label: 'Shop for Tires Page Hero',
          admin: {
            description: 'Content for the hero section on the shop for tires page',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'Find the Perfect Tires for Your Vehicle',
              admin: {
                description: 'Heading for the shop for tires page hero section',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                'Explore our wide selection of premium tires from top brands. Get the right fit, performance, and price for your vehicle with expert guidance from our team.',
              admin: {
                description: 'Paragraph text for the shop for tires page hero section',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description: 'Image for the shop for tires page hero section',
              },
            },
            {
              name: 'overlayOpacity',
              type: 'number',
              required: true,
              label: 'Overlay Opacity',
              min: 0,
              max: 100,
              defaultValue: 50,
              admin: {
                description:
                  'Overlay opacity percentage (0-100). Higher values create a darker overlay.',
                condition: (data, siblingData) => Boolean(siblingData?.image),
              },
            },
          ],
        },
        {
          name: 'ctaSection',
          type: 'group',
          label: 'Shop for Tires CTA Section',
          admin: {
            description: 'Call to action section content for shop for tires',
          },
          fields: [
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Find Your Perfect Fit',
              admin: {
                description: 'Tagline for the shop for tires CTA section',
              },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'Shop Premium Tires for Every Vehicle',
              admin: {
                description: 'Heading for the shop for tires CTA section',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Paragraph',
              defaultValue:
                'Browse our extensive selection of top-quality tires from leading brands. Whether you need all-season, performance, or off-road tires, we have the perfect match for your vehicle and driving needs.',
              admin: {
                description: 'Paragraph text for the shop for tires CTA section',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description: 'Image for the shop for tires CTA section',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'serviceArea',
      type: 'group',
      label: 'Service Area',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          defaultValue: 'Service Coverage',
          admin: {
            description: 'Tagline for the service area section',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Areas We Serve',
          admin: {
            description: 'Main heading for the service area section',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          filterOptions: selectedSiteOrGlobalFilter,
          admin: {
            description: 'Image for the service area section',
          },
        },
      ],
    },
    {
      name: 'trustSection',
      type: 'group',
      label: 'Trust Section',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          defaultValue: 'Trust & Reliability',
          admin: {
            description: 'Tagline for the trust section',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Why Customers Trust Us',
          admin: {
            description: 'Main heading for the trust section',
          },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          defaultValue:
            "With decades of experience and thousands of satisfied customers, we have built our reputation on quality service, honest pricing, and expert care. Here's what sets us apart.",
          admin: {
            description: 'Paragraph text for the trust section',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Trust Items',
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'Three trust factors with heading, paragraph, and icon/badge',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Item Heading',
              admin: {
                description: 'Heading for this trust item',
              },
            },
            {
              name: 'paragraph',
              type: 'textarea',
              required: true,
              label: 'Item Description',
              admin: {
                description: 'Description text for this trust item',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Trust Badge/Icon',
              filterOptions: selectedSiteOrGlobalFilter,
              admin: {
                description:
                  'Icon or badge image for this trust item (e.g., certification badge, trust icon)',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
