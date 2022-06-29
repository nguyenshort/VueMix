export type IButtonProps = {
    color?: UIColor
    active?: boolean
    block?: boolean
}

export enum UIColor {
    primary = 'primary',
    dark = 'dark',
}

export enum UISize {
    xl = 'xl',
    large = 'large',
    default = 'default',
    small = 'small',
    mini = 'mini',
}
