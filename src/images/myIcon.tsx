
interface PolygonData {
  color: string;
  
}

const MyIcon = ({ color }: PolygonData) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} className="w-2 h-5" width={'30px'}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
};

export default MyIcon;

