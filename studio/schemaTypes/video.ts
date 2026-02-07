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
            name: 'transcript',
            title: 'Transcript',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],

})