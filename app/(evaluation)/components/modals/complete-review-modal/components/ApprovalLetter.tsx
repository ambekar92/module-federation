import React, { Dispatch, RefObject, useEffect, useState } from 'react'
import { ApprovalLetterType, CompleteReviewFormType, Steps } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { approvalLetterSchema } from '../schema'
import { Button, ButtonGroup, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import Checkbox from '@/app/shared/form-builder/form-controls/Checkbox'

const containerStyles: React.CSSProperties = {padding: '0rem 1rem', minHeight: '20vh', maxHeight: '60vh', overflowY: 'auto', border: '1px solid black'}

const ApprovalLetter = ({ modalRef, setCurrentStep }: { modalRef: RefObject<ModalRef>, setCurrentStep: Dispatch<React.SetStateAction<number>> }) => {
    const [currentLetterIdx, setCurrentLetterIdx] = useState<number | null>(null);
    const [supplementalLetters, setSupplementalLetters] = useState<string[]>([]);
    const {getValues, setValue, reset} = useFormContext<CompleteReviewFormType>()

    const methods = useForm<ApprovalLetterType>({
        resolver: zodResolver(approvalLetterSchema),
        defaultValues: getValues('approvalLetter'),
        shouldUnregister: true
    })

    useEffect(() => {
        setSupplementalLetters(['Supplemental Letter 1', 'Supplemental Letter 2', 'Supplemental Letter 3']);
    } , [])

    function onContinue() {
        if (currentLetterIdx === null && supplementalLetters.length > 0) {
            setCurrentLetterIdx(0);
            return;
        } else if (currentLetterIdx !== null && currentLetterIdx <= supplementalLetters.length) {
            setCurrentLetterIdx(currentLetterIdx => currentLetterIdx! + 1);
        } 
        if (currentLetterIdx === supplementalLetters.length) {
            setCurrentStep(Steps.DeclineLetter);
        }
    }

    function onPrevious() {
        if (currentLetterIdx === null || !supplementalLetters.length) {
            setCurrentStep(Steps.ReviewSummary);
        } else if (currentLetterIdx > 0) {
            setCurrentLetterIdx(currentLetterIdx => currentLetterIdx! - 1);
        } else if (currentLetterIdx === 0) { 
            setCurrentLetterIdx(null);
        }
    }

    function onCancel() {
        setCurrentStep(1);
        reset();
        modalRef.current?.toggleModal();
    }

    function getContinueButtonTxt() {
        if (!supplementalLetters.length) {
            return 'Continue';
        }
        if (currentLetterIdx === null && supplementalLetters.length > 0) {
            return `Continue & View ${supplementalLetters.length} Suppemental Letters`;
        } 
        if (currentLetterIdx! < supplementalLetters.length - 1) {
            return 'Continue';
        } 
        if (currentLetterIdx === supplementalLetters.length - 1) {
            return 'Preview PDF';
        } 
        if (currentLetterIdx === supplementalLetters.length) {
            return 'Sign and Continue';
        }
    }

    function onSubmit(data: ApprovalLetterType) {
        setValue('approvalLetter', data);
        setCurrentStep(Steps.DeclineLetter);

    }

    const content = currentLetterIdx === null ? 
    <div style={containerStyles}>
        <>
            <p>
                Aovident nostrum, ex, veniam beatae fugit aspernatur, soluta voluptatem non! Laudantium, quasi, accusantium veniam deleniti in ex praesentium sint vitae a rerum provident optio odit? Molestias, earum!
                Voluptas sunt nobis aliquam, ullam quasi quos? Magni, enim. Nostrum ducimus excepturi asperiores, laudantium dolor a eligendi sapiente voluptatum saepe. Quis iure accusamus dolor voluptatum, odio quisquam! Ab, quos magni?
                Exercitationem maiores tempore quo aut veniam voluptatibus repellat quisquam, consectetur suscipit autem esse! Exercitationem, aut a doloremque sit at commodi ut omnis ex quis quaerat facere totam, cupiditate autem perspiciatis.
                Sint dicta officia assumenda quae voluptatem ducimus odio repudiandae. Consequuntur, assumenda sequi tempora at ullam rerum repellat perferendis eaque fuga aliquam quaerat aut asperiores esse quo modi cum, suscipit eveniet.
                Laboriosam ipsam earum sapiente vitae, veritatis tempore nesciunt ullam nostrum labore et repellendus excepturi sed ipsum alias aut quae sequi optio cumque libero recusandae consequatur nemo, itaque placeat adipisci. Praesentium.
                Temporibus ad, quia labore laboriosam molestias, excepturi nemo minus modi velit, quod reprehenderit. Excepturi praesentium aut consequatur earum, iusto asperiores adipisci veniam inventore eveniet! Aliquam nihil distinctio accusantium consectetur aspernatur.
            </p>
            <p>
                Aovident nostrum, ex, veniam beatae fugit aspernatur, soluta voluptatem non! Laudantium, quasi, accusantium veniam deleniti in ex praesentium sint vitae a rerum provident optio odit? Molestias, earum!
                Voluptas sunt nobis aliquam, ullam quasi quos? Magni, enim. Nostrum ducimus excepturi asperiores, laudantium dolor a eligendi sapiente voluptatum saepe. Quis iure accusamus dolor voluptatum, odio quisquam! Ab, quos magni?
                Exercitationem maiores tempore quo aut veniam voluptatibus repellat quisquam, consectetur suscipit autem esse! Exercitationem, aut a doloremque sit at commodi ut omnis ex quis quaerat facere totam, cupiditate autem perspiciatis.
                Sint dicta officia assumenda quae voluptatem ducimus odio repudiandae. Consequuntur, assumenda sequi tempora at ullam rerum repellat perferendis eaque fuga aliquam quaerat aut asperiores esse quo modi cum, suscipit eveniet.
                Laboriosam ipsam earum sapiente vitae, veritatis tempore nesciunt ullam nostrum labore et repellendus excepturi sed ipsum alias aut quae sequi optio cumque libero recusandae consequatur nemo, itaque placeat adipisci. Praesentium.
                Temporibus ad, quia labore laboriosam molestias, excepturi nemo minus modi velit, quod reprehenderit. Excepturi praesentium aut consequatur earum, iusto asperiores adipisci veniam inventore eveniet! Aliquam nihil distinctio accusantium consectetur aspernatur.
            </p>
            <p>
                Aovident nostrum, ex, veniam beatae fugit aspernatur, soluta voluptatem non! Laudantium, quasi, accusantium veniam deleniti in ex praesentium sint vitae a rerum provident optio odit? Molestias, earum!
                Voluptas sunt nobis aliquam, ullam quasi quos? Magni, enim. Nostrum ducimus excepturi asperiores, laudantium dolor a eligendi sapiente voluptatum saepe. Quis iure accusamus dolor voluptatum, odio quisquam! Ab, quos magni?
                Exercitationem maiores tempore quo aut veniam voluptatibus repellat quisquam, consectetur suscipit autem esse! Exercitationem, aut a doloremque sit at commodi ut omnis ex quis quaerat facere totam, cupiditate autem perspiciatis.
                Sint dicta officia assumenda quae voluptatem ducimus odio repudiandae. Consequuntur, assumenda sequi tempora at ullam rerum repellat perferendis eaque fuga aliquam quaerat aut asperiores esse quo modi cum, suscipit eveniet.
                Laboriosam ipsam earum sapiente vitae, veritatis tempore nesciunt ullam nostrum labore et repellendus excepturi sed ipsum alias aut quae sequi optio cumque libero recusandae consequatur nemo, itaque placeat adipisci. Praesentium.
                Temporibus ad, quia labore laboriosam molestias, excepturi nemo minus modi velit, quod reprehenderit. Excepturi praesentium aut consequatur earum, iusto asperiores adipisci veniam inventore eveniet! Aliquam nihil distinctio accusantium consectetur aspernatur.
            </p>
        </>
    </div> :
    supplementalLetters.length > 0 && currentLetterIdx !== null && currentLetterIdx < supplementalLetters.length
    ? <div style={containerStyles}>{supplementalLetters[currentLetterIdx]}</div>
    : <><div style={containerStyles}>PDF doc</div>
    <h5>Signature</h5>
    <Checkbox<ApprovalLetterType>
        name='decision'
        label={`By clicking this checkbox, you are attesting that you've done a thorough review and are ready to officially approve or deny the certifications listed in this application. Once you select "Sign and Submit", the applicant will be notified and receive their official letters.`}/>
    </>;

return (
        <FormProvider {...methods}>
            <h4>Approval Letter(s)</h4>
            {currentLetterIdx !== null && currentLetterIdx >= 0 && currentLetterIdx < supplementalLetters.length && <p>Supplemental Letter {currentLetterIdx+1}</p>}
           {content}

            <ModalFooter style={{ marginTop: '3rem' }}>
                <ButtonGroup style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', gap: '1rem'}}>
                    <Button
                        type="button"
                        onClick={onPrevious}
                        outline
                    >
                        Previous
                    </Button>
                    {currentLetterIdx !== supplementalLetters.length && <Button
                        type="button"
                        onClick={onContinue}
                    >
                        {getContinueButtonTxt()}
                    </Button>}
                    {currentLetterIdx === supplementalLetters.length && <Button
                        type="submit"
                        onClick={methods.handleSubmit(onSubmit)}
                    >
                        Sign and Continue
                    </Button>}

                    </div>
                    <Button
                        type="button"
                        onClick={onCancel}
                        outline
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </ModalFooter>
        </FormProvider>
    )
}

export default ApprovalLetter