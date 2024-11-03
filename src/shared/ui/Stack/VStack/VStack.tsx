import { Flex, type FlexProps } from '../Flex/Flex'

type HStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: HStackProps) => {
    return (
        <Flex {...props} direction="column">
            {props.children}
        </Flex>
    )
}
