// Takes a youtube link and returns the YT video code
export function formatYT(ytLink: string)
{

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = ytLink.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;

}