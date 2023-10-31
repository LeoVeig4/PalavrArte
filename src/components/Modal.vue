<template>
    <transition appear name="bounce">
        <div class="modal fade" @click.self="closeModal" :class="[
            { 'show d-block': show },
            { 'd-none': !show },
            { 'modal-mini': type === 'mini' }
        ]" v-show="show" tabindex="-1" role="dialog" :aria-hidden="!show">
            <div class="modal-dialog modal-dialog-centered" :class="[{ 'modal-notice': type === 'notice' }, modalClasses]">
                <div class="modal-content" :class="[
                    gradient ? `bg-gradient-${gradient}` : '',
                    modalContentClasses
                ]">
                    <div class="modal-header" :class="[headerClasses]" v-if="$slots.header">
                        <slot name="header"></slot>
                        <slot name="close-button">
                            <argon-button type="button" color="transparent" class="close btn-link" v-if="showClose"
                                @click="closeModal" data-dismiss="modal" aria-label="Close">
                                <span :aria-hidden="!show">×</span>
                            </argon-button>
                        </slot>
                    </div>
                    <div class="modal-body" :class="[bodyClasses, { scroll: scroll }]">
                        <slot></slot>
                    </div>
                    <div class="modal-footer" :class="footerClasses" v-if="$slots.footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: "modal",
    components: {

    },
    props: {
        show: Boolean,
        showClose: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: "",
            validator(value) {
                let acceptedValues = ["", "notice", "mini"];
                return acceptedValues.indexOf(value) !== -1;
            },
            description: 'Modal type (notice|mini|"") '
        },
        modalClasses: {
            type: [Object, String],
            description: "Modal dialog css classes"
        },
        modalContentClasses: {
            type: [Object, String],
            description: "Modal dialog content css classes"
        },
        gradient: {
            type: String,
            description: "Modal gradient type (danger, primary etc)"
        },
        headerClasses: {
            type: [Object, String],
            description: "Modal Header css classes"
        },
        bodyClasses: {
            type: [Object, String],
            description: "Modal Body css classes"
        },
        footerClasses: {
            type: [Object, String],
            description: "Modal Footer css classes"
        },
        animationDuration: {
            type: Number,
            default: 500,
            description: "Modal transition duration"
        },
        closeOnClick: {
            type: Boolean,
            default: true,
            description: "Wheter modal should close when clicked"
        },
        scroll: {
            type: Boolean,
            default: false,
            description: "Wheter modal should scroll before page bottom"
        }
    },
    methods: {
        closeModal() {
            if (this.closeOnClick) {
                this.$emit("update:show", false);
                this.$emit("close");
            }
        }
    },
    watch: {
        show(val) {
            let documentClasses = document.body.classList;
            if (val) {
                documentClasses.add("modal-open");
            } else {
                documentClasses.remove("modal-open");
            }
        }
    },
    beforeUnmount() {
        document.body.classList.remove("modal-open");
    }
};
</script>
<style>
.scroll {
    max-height: calc();
    overflow-y: auto;
}

.modal.show {
    background-color: rgba(0, 0, 0, 0.3);
}
</style>