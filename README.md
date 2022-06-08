# Smart Form Example
## Next.js + React Hook Form + Google Recaptcha

## The idea behind the example

Submission forms can range in complexity from a simple contact form to a more complex multi-step form. Validation, error display, accessibility (A11y ARIA), spam prevention, a variety of form fields, data gathering, and eventually submitting the data to the server are all factors to consider when creating a good form component. Wouldn't it be much easier if there was a SmartForm, a reusable, dynamic form that did all the heavy lifting for us and all we had to do was add the fields we wanted to display and everything worked smoothly? In this project example, I'll illustrate how to do it with [React Hook Form](https://react-hook-form.com/) and [Google reCAPTCHA V3](https://www.google.com/recaptcha/about/). 

## Starter project

This project is based on the starter [Next.js + MUI 5 Light/Dark Mode Theme + TypeScript example](https://github.com/tamvo22/mui-v5-theme).


## Objective

In order to create a SmartForm, we would need to do the following:

- Create the base form component using React Hook Form, which can display form errors and send data to our server. 

- We'll utilize the useCallbackOnce hook function to limit the amount of form submissions in a particular interval to prevent too many form submissions from a single user. We'll also add a MUI 5 button that shows the loading progress when the form submits data.

- For spam prevention, incorporate Google reCAPTCHA V3 into our SmartForm. We will add the recaptcha script to our Next.js document and use the useRecaptchaValidate hook to verify our recaptchaToken using Google API. In addition, we will implement our server api route to handle the Google recaptchaToken verification process.

- Create the corresponding form fields with React Hook Form controller. In our project, for example, the input fields will be Name, Email, and Message. 


## Key points

- We must utilize the useIsMounted hook function to guarantee that we only update states when our component is mounted to avoid memory leaks while resolving async data fetching promises.

```jsx
// src/_utils/hooks/useIsMounted.ts
import { useCallback, useEffect, useRef } from 'react';

export default function useIsMounted() {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const isMounted = useCallback(() => {
    return isMountedRef.current;
  }, []);

  return isMounted();
}
```

- The Google reCAPTCHA V3 Site key is a public key that must be sent to the client for verification. To enable our environment variable to be public, we can either use the [prefix NEXT_PUBLIC_](https://nextjs.org/docs/basic-features/environment-variables) or set [publicRuntimeConfig in next.config.js](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration). In our example, I used the Next.js NEXT_PUBLIC_ prefix to make things easier.


```jsx
// .env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="Your Google reCAPTCHA V3 Site Key"
RECAPTCHA_SECRET_KEY="Your Google reCaptcha Secret Key"

// next.config.js
module.exports = {
  publicRuntimeConfig: {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
  ...
}
```


## Let's get started

#### SmartForm Component

Our initial focus will be on the SmartForm component. We can simply achieve this task using the React Hook Form library. React Hook Form is an excellent choice because of its approach to using uncontrolled/controlled inputs with ref, as well as its easy integration with Next.js and MUI 5. Our SmartForm implementation is a lot easier thanks to the makers of the React Hook Form package.

There are many functions and hooks available with React Hook Form. However, in this example, we will only need to use the follow hooks and methods:

- [`useForm()`](https://react-hook-form.com/api/useform/#main) a hook for managing forms interaction validation and default props.

- [`FormProvider()`](https://react-hook-form.com/advanced-usage#FormProviderPerformance) uses React's Context API to pass form props to down the form component tree.

- [`useFormContext()`](https://react-hook-form.com/api/useformcontext) a hook allows you to access the form props passed down from FormProvider. 

- [`useController()`](https://react-hook-form.com/api/usecontroller#main) a hook use to register fields and access the field's properties.

- [`control`](https://react-hook-form.com/api/useform/control#main) contains the form internal methods and properties for managing form component states.

- [`formState`](https://react-hook-form.com/api/useform/formstate#main) contains form state information to track user's interaction with our form application.

- [`reset()`](https://react-hook-form.com/api/useform/reset) a method to reset all form components to it's default values.


Let's begin by creating a basic form using React Hook Form. We'll start our form with a defaultValues object and validate our form fields using the 'onBlur' mode when they lose focus. Following that, we build up FormProvider and a onSubmit handler that makes use of React Hook Form's handleSubmit method.

```jsx
// src/components/forms/SmartForm/index.tsx
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

export type SmartFormProps = {
  submitLabel?: string;
	onSubmit: SubmitHandler<any>;
	defaultValues?: any;
	children: React.ReactElement | React.ReactElement[];
};

function SmartForm({ submitLabel, onSubmit, defaultValues = {}, children }: SmartFormProps) {

  // initiate our form by using useForm hook
  const methods = useForm({
    defaultValues: defaultValues, // assign field default values
    mode: 'onBlur', // validate the field value upon losing focus
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
        {children}
        <button type='submit'>
          {submitLabel}
        </button>
      </form>
    </FormProvider>
  );
}
```

We further improve our SmartForm component even further by using the useCallbackOnce hook to limit the interval between form submissions. The useCallbackOnce hook returns a status boolean state and a submitOnce method to call that processes the data after the indicated timeout value when submitting our form submission. We also replaced our standard submit button with the MUI 5 process button component to display the loading process based on the submission status variable.

```jsx
// src/components/forms/SmartForm/index.tsx
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import ProcessButton from '@/com/ui/ProcessButton';

export type SmartFormProps = {
  submitLabel?: string;
	onSubmit: SubmitHandler<any>;
	defaultValues?: any;
	children: React.ReactElement | React.ReactElement[];
};

function SmartForm({ submitLabel, onSubmit, defaultValues = {}, children }: SmartFormProps) {


  const { status, submitOnce } = useCallbackOnce();

  // initiate our form by using useForm hook
  const methods = useForm({
    defaultValues: defaultValues, // assign field default values
    mode: 'onBlur', // validate the field value upon losing focus
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => submitOnce(data, onSubmit, timeout))}>
        {children}
        <ProcessButton type='submit' disabled={status}>
          {submitLabel}
        </ProcessButton>
      </form>
    </FormProvider>
  );
}
```

For spam prevention, we will integrate Google reCAPTCHA V3 into our SmartForm. To begin, we will need to copy our site key and secret key from the [Google reCAPTCHA V3 Console](https://www.google.com/recaptcha/about/) and paste them into our .env environmental variables: NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY. To run our example locally in development mode, we will need to add "localhost" or "127.0.0.1" to the Google reCAPTCHA Domain. Finally, we will need to include the Google reCAPTCHA script in the Next.js document head.

```jsx
// pages/_document.tsx
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default class MyDocument extends Document<CustomDocumentProps> {
  // load Google reCAPTCHA script
  const reCaptchaScriptSource = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY!}`;

  return {
    reCaptchaScriptSource,
  };

  render() {
    const { emotionStyleTags, initTheme, reCaptchaScriptSource } = this.props;

    return (
      <Html lang='en'>
      <Head>
        <script key={'greCaptcha'} src={reCaptchaScriptSource}></script>
      </Head>
      </Html>
    );
  }
}
```

After we have set up our Google reCAPTCHA script, we will implement the useRecaptchaValidate hook function. The hook uses the Google reCAPTCHA Site key to call grecaptcha.execute(), which returns a reCAPTCHA token. We will send our reCAPTCHA token to the backend server for validation using [Axios](https://axios-http.com/) and determine if our client can submit the form based on the return result.

```jsx 
// src/_utils/hooks/useRecaptchaValidate.ts
import { useState, useEffect } from 'react';
import useIsMounted from '@/utils/hooks/useIsMounted';
import axios from 'axios';

const axiosClient = axios.create();

export const useRecaptchaValidate = (recaptchaSiteKey: string, apiRoute: string) => {
  const [recaptchaResult, setRecaptchaResult] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    const { grecaptcha } = window as any;

    // exit if recaptchaResult is true;
    if (recaptchaResult) return;

    grecaptcha?.ready(async () => {
      const reCaptchaToken = await grecaptcha?.execute(recaptchaSiteKey, { action: 'submit' });

      // exit is reCaptchaToken is undefined
      if (!reCaptchaToken) return;

      const requestHeaders = { token: reCaptchaToken };
      const result = await axiosClient(apiRoute, { headers: requestHeaders });

      if (result.data.verified) {
        isMounted && setRecaptchaResult(true);
      }
    });
  }, [recaptchaSiteKey, apiRoute]);

  return recaptchaResult;
};
```

We will use our function verifyRecaptchaToken() in our backend server api verify route to send the token to [google.com/recaptcha/api/siteverify](https://developers.google.com/recaptcha/docs/verify) for verification. If the verification is successful and the score is greater than 0.5, it will return True; otherwise, it will return False. We will always return a successful status(200) response with a JSON string of verified: true or false to avoid any issues during the verification.

```jsx 
// pages/api/verify.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { token } = req.headers;

    // type guard recaptcha_token must be a string and not string[]
    if (token && typeof token === 'string') {
      try {
	const isValidToken = await verifyRecaptchaToken(token);
        if (isValidToken) {
	  res.status(200).json({ verified: true });
	} else {
	  res.status(200).json({ verified: false });
	}
      } catch (error: any) {
	res.status(200).json({ verified: false });
      }
    } else {
      res.status(200).json({ verified: false });
    }
};

const verifyRecaptchaToken = async (token: string): boolean => {
  // Google reCAPTCHA fetch param options
  const fetchOptions = {
    method: 'POST',
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  };

  try {
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', fetchOptions);
    const respJson = await resp.json();
    const { success, score } = respJson;

    // return if successfuly validated and score of 0.5 or above
    return success && score > 0.5;
  } catch (e) {
    return false;
  }
};
```

Next, we will create the form fields and link them to the React Hook Form useController hook controller for it to communicate with our form. We will need to create the MUI 5 TextField and InputLabel, which are the base field components required for most of our form controls. TextField will be used to extend both the Email and Message fields for our example. We could also use the MUI 5 Grid system in FieldLayout component to improve the field alignment layout. 

The MUI 5 TextField implementation is pretty straightforward. The only section that is worth noting is integrating the TextField with [React Hook Form useController](https://react-hook-form.com/api/usecontroller) hook. Here, we will retrieve the control object from the useFormContext() hook. We do not access control object directly and only need to pass it to the useController() hook. 

When we pass the name, defaultValue, control, and rules parameters to our useController hook, and we'll get our field and fieldState objects in return. We don't need to worry about the field object other than passing it down to our TextField. We will, however, require fieldState to display appropriate field error messages for our field.

The [rules property](https://react-hook-form.com/get-started#Applyvalidation) can be used to control how our fields are validated. We can set the default required option rule, and we can pass in a RegEx pattern for email validation in the Email field for more specific validations.


```jsx
  // src/components/forms/fields/TextField/index.tsx
  const { control } = useFormContext(); // retrieve all hook methods

  const {
    field, // { onChange, onBlur, name, value, ref },
    fieldState, //: { invalid, isTouched, isDirty, error },
  } = useController({
    name: name,
    defaultValue: defaultValue,
    control: control,
    rules: {
      required: required && { value: true, message: 'Field is required' },
      ...rules,
    },
  });

  const error = fieldState.error;

  return (
    <MuiTextField
      variant={variant}
      id={name}
      aria-describedby={'input' + name}
      aria-invalid={error ? 'true' : 'false'}
      error={Boolean(error)}
      helperText={error?.message}
      size={size}
      autoComplete={autoComplete}
      fullWidth={fullWidth}
      InputProps={{
        readOnly: readOnly,
        disabled: disabled,
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
      {...rest}
      {...field}
     />
   );

  // src/components/forms/fields/Email/index.tsx
  const EmailRegEx =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ...

  // pass in a RegEx pattern for more specific field validations
  rules={{
    pattern: {
      value: EmailRegEx,
      message: 'Incorrect email format',
    },
    ...rules,
  }}

```

Finally, our SmartForm component can be added to our Contact form. We only needed to provide our SmartForm with the submit function and the form fields we created. We can process the data further in our handleOnSubmit function and send the data to our backend server to save it to the database or send an email notification. In our example, for the form status notification, I used the Toast library, but you can use any other library. 

```jsx
// src/components/forms/ContactForm/index.tsx
  async function handleOnSubmit(data: Data) {
     // Send form data to backend server to save to database or email notification service such has SendGrid or SendInBlue

     toast.success('Thank you for your email.');
   }

   return (
    <SmartForm submitLabel='Send' onSubmit={handleOnSubmit}>
      <GridContainer>
        <GridItem md={6}>
          <InputLabel name='name' required>Name</InputLabel>
          <TextField  name='name' required  placeholder='Your Name' />
        </GridItem>
        <GridItem md={6}>
          <InputLabel name='email' required>Email Address</InputLabel>
          <Email name='email' startIcon required fullWidth placeholder='Your Email' />
        </GridItem>
        <GridItem md={12}>
          <InputLabel name='message' required>Message</InputLabel>
          <TextField name='message' required multiline minRows={6} fullWidth placeholder='Your Message' />
        </GridItem>
      </GridContainer>
    </SmartForm>
  )
```

## Conclusion

That's all there is to our SmartForm setup. We can now extend our SmartForm to include more custom form fields as well as advanced features like conditional fields, multi-step functionality, and payment processing. I hope you enjoyed this sample project, and I hope to provide you with more exciting projects in the future.
