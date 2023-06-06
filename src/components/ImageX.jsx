import Image from "next/image"

export function ImageX(props)
{
    return (
        <Image
            className={props.className}
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height || props.width}
            priority={props.priority}
        />
    )
}