/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastConfig } from 'react-native-styled-toast/dist/Toast';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import uuid from 'react-uuid';
import { InputUser, User } from '../../../../../generated/generated';
import { uploadStorage } from '../../../../../library/api/uploadStorage';
import { IMAGE_PREFIX } from '../../../../../library/globalConstants';
import { FormElements } from '../../../initialWizard/initialWizard';

type KeyValue = {
  [x: string]: string | null;
};

type UpdateMutationType = (input: Partial<InputUser>) => void;

interface Props {
  goBack: () => void;
  toast: (options: ToastConfig) => void;
  mutation: UpdateMutationType;
  name: FormElements;
}
export const onSubmit = ({ goBack, toast, mutation, name }: Props) => async (
  values: KeyValue,
) => {
  try {
    const mutationValues = {
      // eslint-disable-next-line radix
      [name]: name === 'age' ? parseInt(values[name] as string) : values[name],
    };

    mutation({ ...mutationValues });

    toast({
      message: 'Field Updated!',
      intent: 'SUCCESS',
      subMessage: `The field, "${name}", has been updated to ${values[name]}`,
      duration: 8000,
    });

    goBack();
  } catch (error) {
    toast({
      message: error.message,
      intent: 'ERROR',
      duration: 8000,
      shouldVibrate: true,
    });
  }
};

interface Location {
  longitude: string;
  latitude: string;
  location: string;
}

interface LocationProps {
  goBack: () => void;
  toast: (options: ToastConfig) => void;
  mutation: UpdateMutationType;
}
export const onSubmitLocation = ({
  goBack,
  toast,
  mutation,
}: LocationProps) => async (location: Location) => {
  try {
    const mutationValues = {
      location: location.location,
      latitude: location.latitude,
      longitude: location.longitude,
    };

    mutation({ ...mutationValues });

    toast({
      message: 'Field Updated!',
      intent: 'SUCCESS',
      subMessage: `The field, "location", has been updated to ${location.location}`,
      duration: 8000,
    });

    goBack();
  } catch (error) {
    toast({
      message: error.message,
      intent: 'ERROR',
      duration: 8000,
      shouldVibrate: true,
    });
  }
};

export const onSubmitArray = ({
  goBack,
  toast,
  mutation,
  name,
}: Props) => async (values: KeyValue) => {
  try {
    const mutationValues = {
      [name]: values[name]?.split(','),
    };

    await mutation({ ...mutationValues });

    toast({
      message: 'Field Updated!',
      intent: 'SUCCESS',
      subMessage: `The field, "${name}", has been updated to ${values[name]}`,
      duration: 3000,
    });

    goBack();
  } catch (error) {
    toast({
      message: error.message,
      intent: 'ERROR',
      duration: 8000,
      shouldVibrate: true,
    });
  }
};

type KeyProps = { [key in keyof Partial<User>]: string };

interface ImagesProps {
  goBack: () => void;
  toast: (options: ToastConfig) => void;
  mutation: UpdateMutationType;
  email: string | undefined;
}

export const onSubmitImages = ({
  goBack,
  toast,
  mutation,
  email,
}: ImagesProps) => async (values: KeyProps) => {
  try {
    const images = [
      values.profilepic,
      values.gallery1,
      values.gallery2,
      values.gallery3,
      values.gallery4,
    ];

    const imagePromiseMap = images.map(async (image, index) => {
      if (image === '') return undefined;
      const ref = `userImages/${email}/gallery${index}${uuid()}`;
      await uploadStorage({
        ref,
        uri: image as string,
      });

      return `${IMAGE_PREFIX}/${ref}`;
    });

    const [
      profilepic,
      gallery1,
      gallery2,
      gallery3,
      gallery4,
    ] = await Promise.all(imagePromiseMap);

    mutation({
      profilepic,
      gallery1,
      gallery2,
      gallery3,
      gallery4,
    });

    toast({
      message: 'Images Updated!',
      intent: 'SUCCESS',
      duration: 8000,
    });

    goBack();
  } catch (error) {
    toast({
      message: error.message,
      intent: 'ERROR',
      duration: 8000,
      shouldVibrate: true,
    });
  }
};
