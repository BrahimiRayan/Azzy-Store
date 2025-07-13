export function TitleLimit(title: string, limit: number = 16): string {
        return title.length > limit ? title.slice(0, limit) + '...' : title;
}

export function addHyphensBetweenPairs(str : string) : string {
  return str.match(/.{1,2}/g)?.join('-') || str;
}