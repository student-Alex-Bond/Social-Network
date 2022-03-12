import styles from './FormsControls.module.css'

export const TextArea = ({input, meta, ...props}: any) => {

    const hasError = meta.touched && meta.error

    return (
        <div className={styles.formControl + ' ' + (hasError ?  styles.error: '')}>
            <textarea {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}