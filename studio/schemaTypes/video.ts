import {defineField, defineType} from 'sanity'

export const videoType = defineType({
    name: 'video',
    title: 'Video Entry',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Video Title',
            type: 'string',
            validation: (rule) => rule.required(), 
        }),
        defineField({
            name: 'collection',
            title: 'Collection',
            type: 'string',
            options:  {
                list: [
                    { title: 'Norse Gods', value: 'norse-gods' },
                    { title: 'Battles', value: 'battles' },
                    { title: 'Notable Figures', value: 'notable-figures' },
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'youtubeId',
            title: 'YouTube Video ID',
            type: 'string',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        }),
        defineField({
            name: 'transcript',
            title: 'Transcript',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'articleMarkdown',
            title: 'Article (Markdown)',
            type: 'text',
            rows: 20,
        })
    ],

})