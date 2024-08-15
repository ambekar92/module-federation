import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@trussworks/react-uswds';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Checkbox from '../shared/form-builder/form-controls/Checkbox';

const schema = z.object({
    agree: z.boolean().refine((val) => val === true, {message: 'You must agree to the terms and conditions'})
})

type SignupForm = z.infer<typeof schema>

const SignupMenu = () => {
    const methods = useForm({
        resolver: zodResolver(schema)
    })
    return (
        <div style={{
            textWrap: 'wrap', 
            width: '30rem', 
            padding: '1rem', 
            display: 'flex', 
            flexDirection: 'column',
            }}>
            <div>
                <h2>Sign Up</h2>
                <p>You can access your account by signing in with one of the options below</p>
            </div>

            <div>
                <hr />
            </div>

            <div>
                <h3>Disclosure</h3>
                <div style={{borderRadius: '4px', backgroundColor: '#e1f3f8', padding: '0.5rem 1rem', lineHeight: '1.5'}}>
                    <p>
                        This is a US Small Business Administration federal government computer system that is for official use only.
                        
                    </p>
                    <p> 
                        This system is subject to monitoring and anyone using this system expressly consents to such monitoring.
                        Individuals found performing unauthorized activities may be subject to disciplinary action including criminal prosecution.

                    </p>

                    <p>
                        Your information will only be used in accordance to our <Link href={'#'}>website privacy policy</Link>
                    </p>
                </div>
            </div>
            <FormProvider {...methods}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                <Checkbox<SignupForm> name='agree' label='I have read and understand the disclosure above' />
                <Button type='button' disabled={!methods.formState.isValid}>Sign Up</Button>
            </div>
            </FormProvider>
        </div>
    )
}

export default SignupMenu