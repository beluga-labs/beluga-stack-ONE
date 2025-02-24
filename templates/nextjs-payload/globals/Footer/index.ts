import type { GlobalConfig } from 'payload';

import { revalidateFooter } from './hooks/revalidateFooter';

export const Footer: GlobalConfig = {
    slug: 'footer',
    label: {
        de: 'Fußbereich',
        en: 'Footer'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'navItems',
            type: 'array',
            label: {
                de: 'Navigation',
                en: 'Navigation'
            },
            fields: [
                {
                    name: 'link',
                    type: 'group',
                    label: {
                        de: 'Link',
                        en: 'Link'
                    },
                    admin: {
                        hideGutter: true
                    },
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    label: {
                                        de: 'Link Bezeichnung',
                                        en: 'Link label'
                                    },
                                    localized: true,
                                    required: true
                                },
                                {
                                    name: 'url',
                                    type: 'text',
                                    label: {
                                        de: 'URL',
                                        en: 'URL'
                                    },
                                    localized: true,
                                    required: true
                                }
                            ]
                        },
                        {
                            name: 'target',
                            type: 'radio',
                            label: {
                                de: 'Verhalten',
                                en: 'Behavior'
                            },
                            options: [
                                {
                                    label: {
                                        de: 'Im aktuellen Tab öffnen',
                                        en: 'Open in the current tab'
                                    },
                                    value: 'self'
                                },
                                {
                                    label: {
                                        de: 'In einem neuen Tab öffnen',
                                        en: 'Open in a new tab'
                                    },
                                    value: 'blank'
                                }
                            ],
                            defaultValue: 'self', // The first value in options.
                            admin: {
                                layout: 'horizontal'
                            }
                        }
                    ]
                }
            ],
            maxRows: 6,
            admin: {
                initCollapsed: true
            }
        },
        {
            name: 'copyright',
            type: 'textarea',
            label: {
                de: 'Copyright',
                en: 'Copyright'
            },
            localized: true
        }
    ],
    hooks: {
        afterChange: [revalidateFooter]
    }
};
