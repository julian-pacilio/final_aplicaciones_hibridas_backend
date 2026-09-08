import yup from 'yup';

export const gameSchema = yup.object({
    name:               yup.string().required().strict(),
    description:        yup.string().required().strict(),
    background_image:   yup.string().optional().strict(),
    genre:              yup.string().required().strict(),
    members:            yup.array().required().strict(),
    edition:            yup.string().required().strict(),
})

