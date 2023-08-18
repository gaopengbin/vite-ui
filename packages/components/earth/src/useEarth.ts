

export default function (props: any, ctx: any, instance: any): void {

    let earth: any = null
    const load = async (): Promise<boolean> => {
        if (props.earth) {
            earth = props.viewer
        }
        instance.earth = earth
        return earth
    }




}