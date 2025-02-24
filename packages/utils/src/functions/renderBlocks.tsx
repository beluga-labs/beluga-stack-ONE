import { Heading, Paragraph } from '@beluga/ui';
import React from 'react';
import { renderFormat } from './renderFormat';

export const renderBlocks = (blocks: any) => {
    const nestedRender = (block: any) => {
        return block.children
            ? renderBlocks(block.children)
            : renderFormat(block);
    };
    const renderedBlocks = blocks.map((block: any, index: number) => {
        if (block.type == 'heading') {
            return (
                <Heading
                    key={index}
                    level={block.tag.replace(/\D/g, '')}
                    size="lg"
                    className={`mb-4 last:mb-0 text-${block.format}`}>
                    {nestedRender(block)}
                </Heading>
            );
        }
        if (block.type == 'paragraph') {
            return (
                <Paragraph
                    key={index}
                    size="xl"
                    className="mb-4 last:mb-0">
                    {nestedRender(block)}
                </Paragraph>
            );
        }
        if (block.type == 'text') {
            return (
                <React.Fragment key={index}>
                    {nestedRender(block)}
                </React.Fragment>
            );
        }
        if (block.type == 'linebreak') {
            return (
                <br
                    key={index}
                    className="block py-4"
                />
            );
        }
    });
    return renderedBlocks;
};
