export const renderFormat = (item: any) => {
    if (item.format == 1) {
        return <strong className="font-bold">{item.text}</strong>;
    }
    if (item.format == 2) {
        return <em className="italic">{item.text}</em>;
    }
    return item.text;
};
