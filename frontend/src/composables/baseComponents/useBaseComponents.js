import BaseBlockQuote from '/src/components/baseComponents/BaseBlockQuote.vue'

import BaseButton from '/src/components/baseComponents/button/BaseButton.vue'
import BaseButtonAlt from '/src/components/baseComponents/button/BaseButtonAlt.vue'

import BaseCheckboxInput from '/src/components/baseComponents/input/BaseCheckboxInput.vue'
import BaseDateInput from '/src/components/baseComponents/input/BaseDateInput.vue'
import BaseFileInput from '/src/components/baseComponents/input/BaseFileInput.vue'
import BaseFormInput from '/src/components/baseComponents/input/BaseFormInput.vue'
import BaseRadioGroup from '/src/components/baseComponents/input/BaseRadioGroup.vue'
import BaseSelectInput from '/src/components/baseComponents/input/BaseSelectInput.vue'
import BaseTextArea from '/src/components/baseComponents/input/BaseTextArea.vue'
import Observer from '/src/components/Observer.vue'

export default (app) => {
    app
        .component('BlockQuote', BaseBlockQuote)
        .component('Button', BaseButton)
        .component('ButtonAlt', BaseButtonAlt)
        .component('CheckboxInput', BaseCheckboxInput)
        .component('DateInput', BaseDateInput)
        .component('FileInput', BaseFileInput)
        .component('FormInput', BaseFormInput)
        .component('Observer', Observer)
        .component('RadioGroup', BaseRadioGroup)
        .component('SelectInput', BaseSelectInput)
        .component('Textarea', BaseTextArea)
}