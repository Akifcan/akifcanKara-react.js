import { FC, useState, useRef, useEffect } from 'react'
import Container from '@/components/common/Container'
import FormInput from '@/components/common/form/FormInput'
import Selectbox from '@/components/common/form/Selectbox'
import Validation, { FormItemProps } from '@/helpers/form/validation'
import Alert from '@/components/common/Alert'
import ProductService from '@/services/product.service'
import CategoryService, { CategoryProps } from '@/services/category.service'
import Head from 'next/head'

const CreateProduct: FC = () => {

    const [validation, setValidation] = useState<Validation>()
    const [isDisabled, setDisabled] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState<boolean>()

    const [name, setName] = useState<FormItemProps<string>>({
        value: '',
        errorMessage: ''
    })

    const [description, setDescription] = useState<FormItemProps<string>>({
        value: '',
        errorMessage: ''
    })

    const [category, setCategory] = useState<FormItemProps<string>>({
        value: 'Category',
        errorMessage: ''
    })

    const [imageURL, setImageURL] = useState<FormItemProps<string>>({
        value: '',
        errorMessage: ''
    })

    const [developerEmail, setDeveloperEmail] = useState<FormItemProps<string>>({
        value: '',
        errorMessage: ''
    })

    const [price, setPrice] = useState<FormItemProps<string>>({
        value: '',
        errorMessage: ''
    })

    const [categories, setCategories] = useState<CategoryProps[]>([])

    const formRef = useRef<HTMLDivElement>(null)

    const loadCategories = async () => {
        setCategories(await CategoryService.instance.listAllCategories())
    }

    useEffect(() => {
        if (!formRef.current) return
        setValidation(new Validation(formRef.current))
        formRef.current.addEventListener('valid', _ => {
            setDisabled(false)
        })
        formRef.current.addEventListener('not-valid', _ => {
            setDisabled(true)
        })
        loadCategories()
    }, [])

    const onSubmit = async () => {
        if (isLoading) return
        setDisabled(true)
        setLoading(true)
        const result = await ProductService.instance.createProduct({
            name: name.value,
            price: parseInt(price.value),
            category: category.value,
            description: description.value,
            avatar: imageURL.value,
            developerEmail: developerEmail.value
        })
        setLoading(false)
        setSuccess(result)
    }

    return <Container>
        <div ref={formRef} className='flex  flex-col justify-center items-center gap-5'>
            <Head>
                <title>Create Product - UPayments</title>
            </Head>
            {validation && (
                <>
                    <h1 className='font-bold text-center my-5 text-4xl'>Create Product</h1>
                    {isSuccess !== undefined && (
                        <Alert color={isSuccess ? 'bg-green' : 'bg-red'} text={isSuccess ? 'Your product created!' : 'An Unexcepted error occurred'} />
                    )}
                    <FormInput isRequired={true} errorMessage={name.errorMessage}>
                        <input
                            value={name.value}
                            onChange={(e) => {
                                setName({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().minLength(5).validate()
                                })
                            }}
                            placeholder='Apple Watch, Samsung S21, Macbook Pro, ...'
                            className='common-item p-3  w-full placeholder:font-semibold' />
                    </FormInput>
                    <FormInput isRequired={true} errorMessage={description.errorMessage}>
                        <textarea
                            value={description.value}
                            onChange={(e) => {
                                setDescription({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().minLength(5).validate()
                                })
                            }}
                            placeholder='Description'
                            className='common-item p-3  w-full placeholder:font-semibold' />
                    </FormInput>
                    <FormInput isRequired={true} errorMessage={imageURL.errorMessage}>
                        <input
                            value={imageURL.value}
                            onChange={(e) => {
                                setImageURL({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                })
                            }}
                            placeholder='Image URL'
                            className='common-item p-3  w-full placeholder:font-semibold' />
                    </FormInput>
                    <FormInput isRequired={true} errorMessage={category.errorMessage}>
                        <Selectbox
                            placeholder={category.value}
                            items={categories?.map(category => {
                                return {
                                    label: category.name,
                                    value: category.name
                                }
                            })}
                            onChange={(e) => {
                                setCategory({
                                    value: e,
                                    errorMessage: validation.setValue(e).notEmpty().validate()
                                })
                            }} />
                    </FormInput>
                    <FormInput isRequired={true} errorMessage={price.errorMessage}>
                        <input
                            type={'number'}
                            value={price.value}
                            onChange={(e) => {
                                setPrice({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                })
                            }}
                            placeholder='Price'
                            className='common-item p-3  w-full placeholder:font-semibold' />
                    </FormInput>
                    <FormInput isRequired={true} errorMessage={developerEmail.errorMessage}>
                        <input
                            type={'string'}
                            value={developerEmail.value}
                            onChange={(e) => {
                                setDeveloperEmail({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().email().validate()
                                })
                            }}
                            placeholder='Email'
                            className='common-item p-3  w-full placeholder:font-semibold' />
                    </FormInput>
                    <button
                        onClick={onSubmit}
                        disabled={isDisabled}
                        className='disabled:cursor-not-allowed w-full common-item md:w-1/3 p-2 bg-white font-bold uppercase text-2xl'>
                        {!isLoading ? 'Submit' : 'Please wait'}
                    </button>
                </>
            )}


        </div>
    </Container>
}

export default CreateProduct