import {APIActionRowComponent, APIMessageActionRowComponent} from "discord.js";

//USAGE
/*
const debug =  new ButtonBuilder({style: 1, label: "123", custom_id: "123", disabled: true, type: 2})
const debug2 =  new ButtonBuilder({style: 1, label: "123", custom_id: "123123", disabled: false, type: 2})
const combined = createMultiButtonOnEmbed([debug.getRawButtonComponent()]) or const combined = createMultiButtonOnEmbed([debug.getRawButtonComponent(), debug2.getRawButtonComponent()])
*/
//USAGE


type buttonComponent = {
    style?: number,
    label?: string,
    custom_id?: string,
    url?: string,
    disabled?: boolean,
    type?: number,
    emoji?: string,
}
type buttonobject = {
    type?: number,
    components?: object,
}
export function createMultiButtonOnEmbed(btn: buttonComponent[]){
    const ret: buttonobject = {type: 1, components: btn}
    return ret as APIActionRowComponent<APIMessageActionRowComponent>
}
export class ButtonBuilder {
    public style = 1
    public label = "Error"
    public custom_id?: string
    public url?: string
    public disabled = false
    public type = 1
    public emoji?: string

    public constructor(button?: {
        style: number,
        label: string,
        custom_id?: string,
        url?: string,
        disabled: boolean,
        type: number,
        emoji?: string,
    }) {
        if (button){
            Object.assign(this, button)
        }
    }

    getButtonComponent(){
        const componentButton: buttonComponent = {}
        const buttonObj: buttonobject = {}
        componentButton.style = this.getStyle()
        componentButton.label = this.getLabel()
        componentButton.custom_id = this.getCustomID()
        componentButton.disabled = this.getDisabled()
        componentButton.type = this.getType()
        componentButton.url = this.getUrl()
        componentButton.emoji = this.getEmoji()
        buttonObj.type = 1
        buttonObj.components = [componentButton]
        return buttonObj as APIActionRowComponent<APIMessageActionRowComponent>
    }

    getRawButtonComponent(){
        const rawButton: buttonComponent = {}
        rawButton.style = this.getStyle()
        rawButton.label = this.getLabel()
        rawButton.custom_id = this.getCustomID()
        rawButton.disabled = this.getDisabled()
        rawButton.type = this.getType()
        rawButton.url = this.getUrl()
        rawButton.emoji = this.getEmoji()
        return rawButton
    }

    getStyle(){
        return this.style
    }
    getLabel(){
        return this.label
    }
    getCustomID(){
        return this.custom_id
    }
    getUrl(){
        return this.url
    }
    getDisabled(){
        return this.disabled
    }
    getType() {
        return this.type
    }
    getEmoji(){
        return this.emoji
    }
}


