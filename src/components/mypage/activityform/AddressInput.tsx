import BaseModal from '@/components/ActivityDetail/BaseModal';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import { ActivitiesFormData } from '@/libs/utils/schemas/activitiesSchema';
import React, { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

interface AddressInputProps {
  register: UseFormRegister<ActivitiesFormData>;
  setValue: UseFormSetValue<ActivitiesFormData>;
  trigger: UseFormTrigger<ActivitiesFormData>;
  errors: FieldErrors<ActivitiesFormData>;
}

export default function AddressInput({
  register,
  setValue,
  trigger,
  errors,
}: AddressInputProps) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleAddressSelect = (data: Address) => {
    setValue('address', data.address, { shouldValidate: true });
    trigger('address');
    setIsAddressModalOpen(false);
  };

  return (
    <>
      <div className="flex">
        <Input
          name="address"
          type="text"
          placeholder="주소"
          register={register('address')}
          error={errors.address}
          disabled={true}
          maxWidth="700px"
        />
        <div className="mt-4 h-58 w-75">
          <Button
            className="ml-10 h-full rounded-md"
            type="button"
            onClick={() => setIsAddressModalOpen(true)}
          >
            검색
          </Button>
        </div>
      </div>
      <input
        name="detailAddress"
        type="text"
        placeholder="상세 주소"
        className="dark-base basic-input -mt-10 mb-30 max-w-792"
      />
      <BaseModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        className="w-full max-w-600 px-24 py-45"
      >
        <DaumPostcode onComplete={handleAddressSelect} />
      </BaseModal>
    </>
  );
}
