/*
const menueobj2 = new MenueBuilder({custom_id: "123", placeholder:"123", value: "123", label: "123", description: "123", default:false})
const menue2 = menueobj2.getMenueComponent()

const menueobj = new MenueBuilder({custom_id: "123", placeholder:"123", value: "123", label: "123", description: "123", default:false})
const menue = menueobj.getRawMenueComponent()

const menueobj1 = new MenueBuilder({custom_id: "1234", placeholder:"1234", value: "1234", label: "1234", description: "1234", default:false})
const menue1 = menueobj1.getRawMenueComponent()

const combined = createMultiMenueSelectOnEmbed("123", "test", [menue1, menue])
 */
//USAGE

import {APIActionRowComponent, APIMessageActionRowComponent} from "discord.js";

type menueobj = {
    type?: number
    components?: object
}

type components = {
    custom_id?: string
    placeholder?: string
    options?: object
    min_values?: number
    max_values?: number
    type?: number
}
type menu = {
    label?: string
    value?: string
    description?: string
    isdefault?: boolean
}

export function createMultiMenueSelectOnEmbed(cid: string, place: string, menues: menu[]){
    const component: components = {}
    component.custom_id = cid
    component.placeholder = place
    component.min_values = 1
    component.max_values = 1
    component.type = 3
    component.options = menues
    const ret: menueobj = {type: 1, components:[component]}
    return ret as APIActionRowComponent<APIMessageActionRowComponent>
}

export class MenueBuilder {
    public custom_id?: string
    public placeholder?: string
    public label?: string
    public value?: string
    public description?: string
    public default?: boolean
    public minvalue?: number
    public maxvalue?: number
    public type = 1

    public constructor(menue?:{
        custom_id?: string
        placeholder?: string
        label?: string
        value?: string
        description?: string
        default?: boolean
    }) {
        if (menue){
            Object.assign(this, menue)
        }
    }

    getMenueComponent(){
        const component: components = {}
        const menue: menu = {}
        const obj: menueobj = {}

        menue.label = this.getLabel()
        menue.value = this.getValue()
        menue.description = this.getDescription()
        menue.isdefault = this.getDefault()

        component.custom_id = this.getCustomid()
        component.placeholder = this.getPlaceholder()
        component.min_values = 1
        component.max_values = 1
        component.type = 3
        component.options = [menue]

        obj.type = 1
        obj.components = [component]
        return obj as APIActionRowComponent<APIMessageActionRowComponent>
    }

    getRawMenueComponent(){
        const menueopj: menu = {}
        menueopj.value = this.getValue()
        menueopj.label = this.getLabel()
        menueopj.isdefault = this.getDefault()
        menueopj.description = this.getDescription()
        return menueopj
    }
    getCustomid(){
        return this.custom_id
    }
    getPlaceholder(){
        return this.placeholder
    }
    getLabel(){
        return this.label
    }
    getValue(){
        return this.value
    }
    getDescription(){
        return this.description
    }
    getDefault(){
        return this.default
    }
}