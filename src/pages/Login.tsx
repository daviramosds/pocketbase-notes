// src/components/Login.tsx
import { useForm, type FieldErrors } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { pb } from '../utils/pocketbase';
import TextInput from '../components/TextInput'; 

interface ILoginFormInputs {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>();

  const onSubmit = async (data: ILoginFormInputs) => {
    try {
      await pb.collection('users').authWithPassword(data.email, data.password);

      toast.success('🎉 Login successful! Redirecting...', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
      });

      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('🚫 Invalid credentials. Please try again.', {
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

  const onError = (errorObject: FieldErrors<ILoginFormInputs>) => {
    const fieldOrder: Array<keyof ILoginFormInputs> = ['email', 'password'];

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
          Login{' '}
          <Link to="/register" className="text-lg text-gray-600 hover:underline font-normal">
            or signup
          </Link>
        </h3>

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

        <button
          type="submit"
          className="outline-none bg-blue-600 px-8 py-3 text-base rounded-md text-white font-medium hover:bg-blue-700 transition-colors duration-200 hover:shadow-lg focus:ring-4 focus:ring-blue-300 w-full mt-4 cursor-pointer"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 text-center w-full mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">Sign up</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;