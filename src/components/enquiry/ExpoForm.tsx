import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
// import Select, { Option, ReactSelectProps } from 'react-select';
// import Select from 'react-select';
import * as Yup from "yup";
import { useAuth } from "../../context/auth";
import api from "../../utils/api";

// import { useAuth } from '@/contexts/auth';
// import api from '@/services/api';
// export type Enquiry = {
//   name1: string;
//   name2: string;
//   email1: string;
//   email2?: string;
//   note?: string;
//   HeardAboutUsFrom?: string;
//   interestedPackage: {
//     id: 2;
//     // "title": "Wedding Videography"
//   };
//   services: [
//     {
//       service: {
//         id: number;
//         serviceTitle: string;
//       };
//       date: string; // "2022-08-14T11:00:00.000Z",
//       // "startTime": "10:00:00.000",
//       // "maximumHour": 10,
//       venues?: null;
//       // "note"?: null
//     }
//   ];
// };

// export type EnquiryForm = {
//   name1: string;
//   name2: string;
//   email1: string;
//   // email2?: string;
//   note?: string;
//   HeardAboutUsFrom?: string;
//   interestedPackage: {
//     id: 2;
//     // "title": "Wedding Videography"
//   };
//   service0Id: number;
//   service0Date: Date | null; // "2022-08-14T11:00:00.000Z",
//   // "startTime": "10:00:00.000",
//   // "maximumHour": 10,
//   service0Venues?: null;
//   // "note"?: null

//   service1Id?: number;
//   service1Date?: Date | null; // "2022-08-14T11:00:00.000Z",
//   service1Venues?: null;

//   service2Id?: number;
//   service2Date?: Date | null; // "2022-08-14T11:00:00.000Z",
//   service2Venues?: null;
// };

const today = new Date();
today.setHours(0, 0, 0, 0);
const EnquirySchema = Yup.object().shape({
  name1: Yup.string()
    .min(2, "Please let us know how to call you")
    .max(50, `^_^ Any shorter name?`)
    .required("Please let us know how to call you"),
  name2: Yup.string()
    // .min(2, 'Too Short!')
    .max(50, `^_^ Any shorter name?`)
    .required("Please let us how to call your honey"),
  // .required('Required'),

  email1: Yup.string()
    .email("Invalid email")
    .required("Email is needed for discount registration"),
  note: Yup.string(),
  interestedPackage: Yup.string().required(
    "Please let us know how can we serve you"
  ),
  // service0: Yup.string().required('Required'),
  service0Date: Yup.date()
    // .when(
    //   'startDate',
    //   (eventStartDate, schema) => eventStartDate && schema.min(new Date())
    // ),
    .min(today, `We can't travel back in time... not yet ^^''`),
  // service0Venues: Yup.string(),

  // service1: Yup.string(),
  // service1Date: Yup.date(),
  // service1Venues: Yup.string(),

  // service2: Yup.string(),
  // service2Date: Yup.date(),
  // service2Venues: Yup.string(),
});
const INITIAL_ENQUIRY_VALUE = {
  name1: "",
  name2: "",
  email1: "",
  note: "",
  interestedPackage: "",
  service0: "",
  service0Date: "",
  service0Venues: "",

  service1: "",
  service1Date: "",
  service1Venues: "",

  service2: "",
  service2Date: "",
  service2Venues: "",
};

/*
// Sample data
{    
    "name1": "Amanda",
    "name2": "Daniel",
    "email1": "Amanda@test.com",
    "email2": "Daniel@test.com",
    "note": null,
    "HeardAboutUsFrom": null,
    "interestedPackage": {
        "id": 2,
        "title": "Wedding Videography"
    },
    "services": [
        {
            "service": {
                "id": 7,
                "serviceTitle": "Wedding Videography"
            },
            "date": "2022-08-14T11:00:00.000Z",
            "startTime": "10:00:00.000",
            "maximumHour": 10,
            "venues": null,
            "note": null
        }
    ]
}
*/

// export const SelectField: React.SFC<ReactSelectProps & FieldProps> = ({
//   options,
//   field,
//   form,
// }) => (
//   <Select
//     options={options}
//     name={field.name}
//     value={
//       options ? options.find((option: any) => option.value === field.value) : ''
//     }
//     onChange={(option: Option) => form.setFieldValue(field.name, option.value)}
//     onBlur={field.onBlur}
//   />
// );

export const ExpoForm = ({
  availablePackages,
  availableServices,
}: {
  availablePackages: Array<any>;
  availableServices: Array<any>;
}) =>
  //   {
  //   availablePackages,
  //   availableServices,
  // }: {
  //   availablePackages: Array<any>;
  //   availableServices: Array<any>;
  // }
  {
    const { user, token } = useAuth();
    console.log(user, token);
    const router = useRouter();
    const formRef = useRef(null);
    const [isLoadingAvailablePackages, setIsLoadingAvailablePackage] =
      useState(true);
    const [availablePackageOptions, setAvailablePackageOptions] = useState(
      [] as Array<any>
    );
    // const [availableServices, setAvailableServices] = useState([]);
    const [availableServiceOptions, setAvailableServiceOptions] = useState(
      [] as Array<any>
    );
    const [initialData, setInitialData] = useState(null as any | null);
    const [service0EventName, setService0EventName] = useState("");

    // const validate = (values: any) => {
    //   const errors = {} as any;
    //   if (!values.email) {
    //     errors.email = 'Required';
    //   }

    //   if (!values.job) {
    //     errors.job = 'Required';
    //   }

    //   return errors;
    // };
    // type YupForm = yup.InferType<typeof EnquiryForm>;
    // const withFormik = Formik({
    //   mapPropsToValues: () => ({ color: '' }),
    //   validationSchema: Yup.object().shape({
    //     color: Yup.string().required('Color is required!'),
    //   }),
    //   handleSubmit: (values, { setSubmitting }) => {
    //     setTimeout(() => {
    //       alert(JSON.stringify(values, null, 2));
    //       setSubmitting(false);
    //     }, 1000);
    //   },
    //   displayName: 'BasicForm', // helps with React DevTools
    // });

    // const formik = useFormik({
    //   initialValues: {
    //     name1: '',
    //     email1: '',
    //     name2: '',
    //     date1: null,
    //     // services: [
    //     //   {
    //     //     service: { id: 6, serviceTitle: 'Wedding Photography' },
    //     //   },
    //     // ],
    //     interestedPackage: { id: 2 },
    //     service0Id: 6,
    //     service0Date: null,
    //   } as EnquiryForm,
    //   validate,
    //   onSubmit: (values) => {
    //     console.log(values);
    //   },
    // });

    useEffect(() => {
      // (async () => {
      //   try {
      //     const { data: availablePackages } = await api.get(
      //       "available-packages"
      //     );
      if (availablePackages) {
        // const parsedEnquiries = parseEnquiries(enquiries);
        // if (parsedEnquiries) {
        setAvailablePackageOptions(
          availablePackages.map((p: any) => ({
            value: p.id,
            label: p.displayTitle,
          }))
        );

        // }
        if (availablePackages?.length > 0) {
          const initialData = {
            ...INITIAL_ENQUIRY_VALUE,
            // interestedPackage: availableServices.find(
            //   (o: any) => o?.title === 'Wedding Photography'
            // )?.title,
            interestedPackage: availablePackages[0].displayTitle,
          };
          setInitialData(initialData);
        }
      }
      // } catch (error) {
      //   console.error("connection failed when fetching: available-package");
      // }
      // try {
      //   const { data: availableServices } = await api.get(
      //     "available-services"
      //   );
      if (availableServices) {
        // const parsedEnquiries = parseEnquiries(enquiries);
        // if (parsedEnquiries) {
        // setAvailableServiceOptions(
        //   availableServices.map((s: any) => ({
        //     value: s.id,
        //     label: s.displayTitle,
        //   }))
        // );
        // setAvailableServices(availableServices);
        setAvailableServiceOptions(
          availableServices.map((s: any) => ({
            value: s.id,
            label: s.displayTitle,
          }))
        );
        // }
      }

      setIsLoadingAvailablePackage(false);
      // } catch (error) {
      //   console.error("connection failed when fetching: available-services");
      // }
      // })();
      // }, [token]);
    }, []);

    // useEffect(() => {
    //   if (!(formRef?.current as any)?.values) {
    //     return;
    //   }
    //   const formValues = (formRef?.current as any)?.values;
    //   debugger;
    //   switch (formValues?.interestedPackage) {
    //     case 'Wedding Photography':
    //       setService0EventName('Wedding');
    //       break;
    //     case 'Wedding Videography':
    //       setService0EventName('Wedding');
    //       break;
    //     case 'Wedding Photography & Videography':
    //       setService0EventName('Wedding');
    //       break;
    //     case 'Engagement Photography + Wedding Photography & Videography':
    //       setService0EventName('Wedding');
    //       break;
    //     case 'Engagement Photography':
    //       setService0EventName('Engagement Photoshoot');
    //       break;
    //     default:
    //       setService0EventName('');
    //       break;
    //   }
    // }, [(formRef?.current as any)?.values]);

    const getEvent0NameFromPackageName = (packageName: string) => {
      switch (packageName) {
        case "Wedding Photography":
          // setService0EventName('Wedding');
          return "Wedding";
        case "Wedding Videography":
          return "Wedding";
        case "Wedding Photography & Videography":
          return "Wedding";
        case "Engagement Photography + Wedding Photography & Videography":
          return "Wedding";
        case "Engagement Photography":
          return "Engagement photoshoot";
        default:
          return "";
      }
    };

    const generateServicesFromPackageName = ({
      packageName,
      service0Date,
      service0Venues,
    }: {
      packageName: string;
      service0Date: string;
      service0Venues: string;
    }) => {
      switch (packageName) {
        case "Wedding Photography":
          // setService0EventName('Wedding');
          return [
            {
              service: {
                id: (
                  availableServices.find(
                    (s: any) => s.serviceTitle === "Wedding Photography"
                  ) as any
                )?.id,
              },
              date: service0Date || null,
              // startTime: null, // '10:00:00.000',
              maximumHour: 10,
              venues: service0Venues || null,
              // note: null,
            },
          ];
        case "Wedding Videography":
          return [
            {
              service: {
                id: (
                  availableServices.find(
                    (s: any) => s.serviceTitle === "Wedding Videography"
                  ) as any
                )?.id,
              },
              date: service0Date || null,
              // startTime: null, // '10:00:00.000',
              maximumHour: 10,
              venues: service0Venues || null,
              // note: null,
            },
          ];
        case "Wedding Photography & Videography":
          return [
            {
              service: {
                id: (
                  availableServices.find(
                    (s: any) =>
                      s.serviceTitle === "Wedding Photography & Videography"
                  ) as any
                )?.id,
              },
              date: service0Date || null,
              // startTime: null, // '10:00:00.000',
              maximumHour: 10,
              venues: service0Venues || null,
              // note: null,
            },
          ];
        case "Engagement Photography + Wedding Photography & Videography":
          return [
            {
              service: {
                id: (
                  availableServices.find(
                    (s: any) =>
                      s.serviceTitle === "Wedding Photography & Videography"
                  ) as any
                )?.id,
              },
              date: service0Date || null,
              // startTime: null, // '10:00:00.000',
              maximumHour: 10,
              venues: service0Venues || null,
              // note: null,
            },
          ];
        case "Engagement Photography":
          return [
            {
              service: {
                id: (
                  availableServices.find(
                    (s: any) =>
                      s.serviceTitle === "Engagement Photography (Standalone)"
                  ) as any
                )?.id,
              },
              date: service0Date || null,
              // startTime: null, // '10:00:00.000',
              maximumHour: 10,
              venues: service0Venues || null,
              // note: null,
            },
          ];
        default:
          return "";
      }
    };

    // useEffect(() => {
    //   if (availablePackageOptions?.length>0&&formRef?.current){

    //   }

    // // }, [formRef?.current, availablePackageOptions]);
    // }, [availablePackageOptions]);
    const onSubmit = async (values: any) => {
      // debugger;
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // alert(JSON.stringify(values, null, 2));

      try {
        const {
          interestedPackage,
          service0,
          service0Date,
          service0Venues,
          service1,
          service1Date,
          service1Venues,
          service2,
          service2Date,
          service2Venues,
          ...clearnedUpValues
        } = values;
        const services = generateServicesFromPackageName({
          packageName: interestedPackage,
          service0Date,
          service0Venues,
        });
        console.log(interestedPackage);
        const data = {
          ...clearnedUpValues,
          heardAboutUsFrom: "Expo2022",
          interestedPackage: {
            id: (
              availablePackageOptions.find(
                (p: any) => p?.label === interestedPackage
              ) as any
            )?.value,
          },
          services,
          submittedBy: user?.username,
          // services: [
          //   {
          //     id: 15,
          //     service: {
          //       id: 6,

          //     },
          //     date: '2022-03-04T11:00:00.000Z',
          //     startTime: '10:00:00.000',
          //     maximumHour: 10,
          //     venues: null,
          //     note: null,
          //   },
          // ],
        };
        // debugger;
        console.log(data);
        const { data: newEnquiry } = await api.post("enquiries", data);
        if (!newEnquiry?.id) {
          window.alert("Server error. ^^''' Let's use pen & paper");
        } else {
          router.push(`/registrationComplete/${(newEnquiry as any)?.id}`);
        }
      } catch (err) {
        console.error("post failed");
        window.alert("Server error. ^^''' Let's use pen & paper");
      }
      // axios.post('/user', {
      //   firstName: 'Fred',
      //   lastName: 'Flintstone'
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      // router.push(url, as, options);
    };

    return (
      <main className="h-full relative w-full">
        {/* <div className='bg-rose-900 flex justify-center w-full'>
        <img
          className='max-h-16'
          src='https://valobucket.s3.amazonaws.com/uploads/2018/06/Valo-Studio-Logo-V2.png'
          alt='valostudio'
        />
      </div> */}
        {/* <div className='mt-2 text-center text-xl'>Discount Registration 2022</div> */}
        <div className="flex h-full justify-center relative md:pt-24">
          <div className="h-full max-h-192 max-w-sm px-4 py-4 relative w-full">
            <div className="text-2xl text-black">National Wedding Show</div>
            <div className="text-xl">Discount Registration</div>
            {/* <div className='text-4xl'>Valo Studio</div> */}

            {/* <div className='text-2xl'>Discount Registration 2022</div> */}

            {/* <form className=''>
          <label>
            Your name:
            <input
              type='text'
              name='name1'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
        </form> */}

            {initialData && (
              <Formik
                innerRef={formRef}
                initialValues={initialData}
                validationSchema={EnquirySchema}
                onSubmit={onSubmit}
              >
                {({
                  isSubmitting,
                  // getFieldProps,
                  // handleChange,
                  // handleBlur,
                  values,
                }) => (
                  <Form className="max-w-sm mt-4">
                    <Field
                      className="my-1 w-full focus:border-pink-500"
                      name="name1"
                      type="text"
                      placeholder="Your name *"
                    />
                    <div className="text-pink-500">
                      <ErrorMessage className="" name="name1" />
                    </div>
                    <Field
                      className="my-1 w-full focus:border-pink-500"
                      name="name2"
                      type="text"
                      placeholder="Your honey's name"
                    />
                    <div className="text-pink-500">
                      <ErrorMessage className="" name="name2" />
                    </div>

                    <Field
                      className="my-1 w-full focus:border-pink-500"
                      name="email1"
                      type="email"
                      placeholder="Your email *"
                    />
                    <div className="text-pink-500">
                      <ErrorMessage className="my-1" name="email1" />
                    </div>

                    <Field
                      className="my-1 w-full focus:border-pink-500"
                      component="select"
                      id="interestedPackage"
                      name="interestedPackage"
                      multiple={false}
                    >
                      {/* <option value='NY'>New York</option>
              <option value='SF'>San Francisco</option>
              <option value='CH'>Chicago</option>
              <option value='OTHER'>Other</option> */}
                      {availablePackageOptions.map((o: any) => (
                        <option key={o.label} value={o.label}>
                          {o.label}
                        </option>
                      ))}
                    </Field>

                    <div className="mt-3 text-lg">
                      {getEvent0NameFromPackageName(values?.interestedPackage)}{" "}
                      date
                    </div>
                    <Field
                      className="my-1 w-full focus:border-pink-500"
                      name="service0Date"
                      type="date"
                    />
                    <div className="text-pink-500">
                      <ErrorMessage className="" name="service0Date" />
                    </div>

                    <Field
                      className="my-1 w-full focus:border-pink-500"
                      name="service0Venues"
                      type="text"
                      component="textarea"
                      placeholder="Venues"
                    />
                    <div className="text-pink-500">
                      <ErrorMessage className="my-1" name="service0Venues" />
                    </div>

                    <Field
                      className="my-1 w-full focus:border-pink-500"
                      name="note"
                      type="text"
                      component="textarea"
                      rows="5"
                      placeholder="Tell us more about your special day"
                    />
                    <div className="text-pink-500">
                      <ErrorMessage className="my-1" name="note" />
                    </div>

                    {/* <div className='h-96 overflow-scroll w-full'>
                  {JSON.stringify((formRef.current as any)?.values, null, 2)}
                </div> */}
                    <div className="flex justify-center mt-6 w-full">
                      <button
                        // className='bg-pink-500 px-4 py-2 rounded-lg'
                        className="border border-rose-700 font-medium mb-2 mr-2 px-5 py-2.5 rounded-lg text-center text-rose-700 text-sm dark:border-rose-500 dark:focus:ring-rose-900 dark:hover:bg-rose-700 dark:hover:text-white dark:text-rose-500 hover:bg-rose-800 hover:text-white focus:ring-4 focus:ring-rose-300"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Register discount
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}

            {/* <form className='mt-4' onSubmit={formik.handleSubmit}>
          <div className='flex mb-2'>
            <label className='mr-2 w-36' htmlFor='name1'>
              Your name
            </label>
            <input
              id='name1'
              name='name1'
              type='text'
              className='input'
              onChange={formik.handleChange}
              value={formik.values.name1}
            />
            {formik.errors.email1 ? (
              <div className='error'>{formik.errors.name1}</div>
            ) : null}
          </div>

          <div className='flex mb-2'>
            <label className='mr-2 w-36' htmlFor='name2'>
              Honey's name
            </label>
            <input
              id='name2'
              name='name2'
              type='text'
              className='input'
              onChange={formik.handleChange}
              value={formik.values.name2}
            />
            {formik.errors.name2 ? (
              <div className='error'>{formik.errors.name2}</div>
            ) : null}
          </div>

          <div className='flex mb-2'>
            <label className='mr-2 w-36' htmlFor='email1'>
              Your email
            </label>
            <input
              id='email1'
              name='email1'
              type='text'
              className='input'
              onChange={formik.handleChange}
              value={formik.values.email1}
            />
            {formik.errors.email1 ? (
              <div className='error'>{formik.errors.email1}</div>
            ) : null}
          </div>

          <div className='mt-4'>
            <label htmlFor='interestedPackage'>Service of Interest</label>
            <CustomSelect
              className='input'
              onChange={(value) =>
                formik.setFieldValue('interestedPackage', value.id)
              }
              value={formik.values.interestedPackage}
              options={availablePackageOptions}
            />
            {formik.errors.interestedPackage ? (
              <div className='error'>{formik.errors.interestedPackage}</div>
            ) : null}
          </div>

          <button type='submit'>Register</button>
        </form> */}
          </div>
        </div>
      </main>
    );
  };

export default ExpoForm;
