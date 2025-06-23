import { useForm, type FieldErrors } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import PocketBase from 'pocketbase';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

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
    const pb = new PocketBase('http://127.0.0.1:8090');

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

        <div className="w-full">
          <input
            className={`
              bg-gray-100 outline-none p-3 text-base border-b-2 rounded-md w-full transition-colors duration-200
              ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
              focus:ring-2 focus:ring-blue-200
            `}
            type="email"
            id="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Please enter a valid email address.',
              },
            })}
          />
        </div>

        <div className="w-full">
          <input
            className={`
              bg-gray-100 outline-none p-3 text-base border-b-2 rounded-md w-full transition-colors duration-200
              ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
              focus:ring-2 focus:ring-blue-200
            `}
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters.',
              },
            })}
          />
        </div>

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
