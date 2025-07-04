import { useForm, type FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '../components/TextInput';
import { pb } from '../utils/pocketbase';

interface IRegisterFormInputs {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  avatar: FileList;
}

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegisterFormInputs>();

  const password = watch('password', '');

  const onSubmit = async (data: IRegisterFormInputs) => {
    try {
      const user = await pb.collection('users').create({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      if (data.avatar?.[0]) {
        const formData = new FormData();
        formData.append('avatar', data.avatar[0]);

        await pb.collection('users').update(user.id, formData);
      }

      toast.success('🎉 Registration successful! Redirecting to login...', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
      });

      navigate('/login');
    } catch (error) {
      console.error('PocketBase error:', error);
      toast.error('🚫 Failed to register. Try again later.', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: 'colored',
      });
    }
  };


  const onError = (errorObject: FieldErrors<IRegisterFormInputs>) => {
    const fieldOrder: Array<keyof IRegisterFormInputs> = ['name', 'email', 'password', 'passwordConfirm', 'avatar'];

    for (const field of fieldOrder) {
      if (errorObject[field]) {
        toast.error(`${errorObject[field]?.message}`, {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: 'colored',
        });
        return;
      }
    }

    toast.error('Unexpected validation error. Please try again.', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: 'colored',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4 w-full max-w-sm p-8 bg-white rounded-lg shadow-md justify-center items-start"
      >
        <h3 className="text-3xl text-gray-800 font-semibold mb-2 text-center w-full">
          Register{' '}
          <a href="/login" className="text-lg text-gray-600 hover:underline font-normal">
            or sign in
          </a>
        </h3>

        <TextInput
          label="Name"
          name="name"
          type="text"
          placeholder="Name"
          register={register}
          errors={errors}
          validationRules={{
            required: 'Name is required.',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters.',
            },
          }}
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          errors={errors}
          validationRules={{
            required: 'Email is required.',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Please enter a valid email address.',
            },
          }}
        />

        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
          validationRules={{
            required: 'Password is required.',
            minLength: {
              value: 3,
              message: 'Password must be at least 3 characters.',
            },
          }}
        />

        <TextInput
          label="Confirm password"
          name="passwordConfirm"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
          validationRules={{
            required: 'Confirm Password is required.',
            validate: (value: string) => value === password || 'Passwords do not match.',
          }}
        />

        <div className="w-full">
          <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">
            Avatar (Optional)
          </label>
          <input
            className={`
              block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2
              ${errors.avatar ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}
              focus:ring-2 focus:ring-blue-200
            `}
            id="avatar"
            type="file"
            accept="image/*" // Restrict to image files
            multiple={false}
            {...register('avatar')}
          />
        </div>

        <button
          type="submit"
          className="outline-none bg-blue-600 px-8 py-3 text-base rounded-md text-white font-medium hover:bg-blue-700 transition-colors duration-200 hover:shadow-lg focus:ring-4 focus:ring-blue-300 w-full mt-4 cursor-pointer"
        >
          Register
        </button>

        <p className="text-sm text-gray-600 text-center w-full mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">Login here</a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;