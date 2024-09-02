// import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// export function MeetingDetailsScreen({
//   onClickJoin,
//   _handleOnCreateMeeting,
//   participantName,
//   setParticipantName,
//   onClickStartMeeting,
// }) {
//   const [meetingId, setMeetingId] = useState("");
//   const [meetingIdError, setMeetingIdError] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);
//   const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
//   const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);

//   return (
//     <div
//       className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
//     >
//       {iscreateMeetingClicked ? (
//         <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center">
//           <p className="text-white text-base">
//             {`Meeting code : ${meetingId}`}
//           </p>
//           <button
//             className="ml-2"
//             onClick={() => {
//               navigator.clipboard.writeText(meetingId);
//               setIsCopied(true);
//               setTimeout(() => {
//                 setIsCopied(false);
//               }, 3000);
//             }}
//           >
//             {isCopied ? (
//               <CheckIcon className="h-5 w-5 text-green-400" />
//             ) : (
//               <ClipboardIcon className="h-5 w-5 text-white" />
//             )}
//           </button>
//         </div>
//       ) : isJoinMeetingClicked ? (
//         <>
//           <input
//             defaultValue={meetingId}
//             onChange={(e) => {
//               setMeetingId(e.target.value);
//             }}
//             placeholder={"Enter meeting Id"}
//             className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center"
//           />
//           {meetingIdError && (
//             <p className="text-xs text-red-600">{`Please enter valid meetingId`}</p>
//           )}
//         </>
//       ) : null}

//       {(iscreateMeetingClicked || isJoinMeetingClicked) && (
//         <>
//           <input
//             value={participantName}
//             onChange={(e) => setParticipantName(e.target.value)}
//             placeholder="Enter your name"
//             className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-white w-full text-center"
//           />

//           {/* <p className="text-xs text-white mt-1 text-center">
//             Your name will help everyone identify you in the meeting.
//           </p> */}
//           <button
//             disabled={participantName.length < 3}
//             className={`w-full ${
//               participantName.length < 3 ? "bg-gray-650" : "bg-purple-350"
//             }  text-white px-2 py-3 rounded-xl mt-5`}
//             onClick={(e) => {
//               if (iscreateMeetingClicked) {
//                 onClickStartMeeting();
//               } else {
//                 if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
//                   onClickJoin(meetingId);
//                 } else setMeetingIdError(true);
//               }
//             }}
//           >
//             {iscreateMeetingClicked ? "Start a meeting" : "Join a meeting"}
//           </button>
//         </>
//       )}

//       {!iscreateMeetingClicked && !isJoinMeetingClicked && (
//         <div className="w-full md:mt-0 mt-4 flex flex-col">
//           <div className="flex items-center justify-center flex-col w-full ">
//             <button
//               className="w-full bg-purple-350 text-white px-2 py-3 rounded-xl"
//               onClick={async (e) => {
//                 const { meetingId, err } = await _handleOnCreateMeeting();

//                 if (meetingId) {
//                   setMeetingId(meetingId);
//                   setIscreateMeetingClicked(true);
//                 } else {
//                   toast(`${err}`, {
//                     position: "bottom-left",
//                     autoClose: 4000,
//                     hideProgressBar: true,
//                     closeButton: false,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                   });
//                 }
//               }}
//             >
//               Create a meeting
//             </button>
//             <button
//               className="w-full bg-gray-650 text-white px-2 py-3 rounded-xl mt-5"
//               onClick={(e) => {
//                 setIsJoinMeetingClicked(true);
//               }}
//             >
//               Join a meeting
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// export function MeetingDetailsScreen({
//   _handleOnCreateMeeting,
//   participantName, // Assuming this is the doctor's name
//   onClickStartMeeting,
// }) {
//   const [meetingId, setMeetingId] = useState("");
//   const [isCopied, setIsCopied] = useState(false);
//   const [isMeetingStarted, setIsMeetingStarted] = useState(false);

//   useEffect(() => {
//     const createAndStartMeeting = async () => {
//       const { meetingId, err } = await _handleOnCreateMeeting({
//         participantName,
//       });

//       if (meetingId) {
//         setMeetingId(meetingId);

//         // when back i create meeting db and insert boolean isStarted then add client meeting part
//         try {
//           // Send the meetingId and doctor's name to your database
//           await axios.post(
//             "http://localhost:8800/api/meeting/save_meeting",
//             {
//               meetingId: meetingId,
//               doctorName: participantName,
//               doctorId: "66cfa30d2fbc2df367dbb2e2",
//               userId: "66cf2733590659a9923d0620",
//               isStarted:"true",
//             },
//             {
//               withCredentials: true,
//               credentials: "include",
//               headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 //'Authorization' : `Bearer ${token}`,
//               },
//             }
//           );
//         } catch (err) {
//           console.log(err);
//         }

//         // Start the meeting automatically
//         onClickStartMeeting();
//         setIsMeetingStarted(true);
//       } else {
//         toast(`${err}`, {
//           position: "bottom-left",
//           autoClose: 4000,
//           hideProgressBar: true,
//           closeButton: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       }
//     };

//     createAndStartMeeting();
//   }, [participantName, _handleOnCreateMeeting, onClickStartMeeting]);

//   return (
//     <div
//       className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
//     >
//       {isMeetingStarted ? (
//         <div className="border border-solid border-gray-400 rounded-xl px-4 py-3 flex items-center justify-center">
//           <p className="text-white text-base">{`Meeting code : ${meetingId}`}</p>
//           <button
//             className="ml-2"
//             onClick={() => {
//               navigator.clipboard.writeText(meetingId);
//               setIsCopied(true);
//               setTimeout(() => {
//                 setIsCopied(false);
//               }, 3000);
//             }}
//           >
//             {isCopied ? (
//               <CheckIcon className="h-5 w-5 text-green-400" />
//             ) : (
//               <ClipboardIcon className="h-5 w-5 text-white" />
//             )}
//           </button>
//         </div>
//       ) : (
//         <p className="text-white text-base text-center">
//           Starting the meeting...
//         </p>
//       )}
//     </div>
//   );
// }

// import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
// import React, { useState, useEffect, useCallback } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export function MeetingDetailsScreen({
//   _handleOnCreateMeeting,
//   participantName, // Assuming this is the doctor's name
//   onClickStartMeeting,
// }) {
//   const [meetingId, setMeetingId] = useState("");
//   const [isCopied, setIsCopied] = useState(false);
//   const [isMeetingStarted, setIsMeetingStarted] = useState(false);

//   const createAndStartMeeting = useCallback(async () => {
//     const { meetingId, err } = await _handleOnCreateMeeting({
//       participantName,
//     });

//     if (meetingId) {

//       setMeetingId(meetingId);

//       try {
//         // Send the meetingId and doctor's name to your database
//         await axios.post(
//           "http://localhost:8800/api/meeting/save_meeting",
//           {
//             meetingId: meetingId,
//             doctorName: participantName,
//             doctorId: "66cfa30d2fbc2df367dbb2e2",
//             userId: "66cf2733590659a9923d0620",
//             isStarted: "true",
//           },
//           {
//             withCredentials: true,
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//           }
//         );
//       } catch (err) {
//         console.log(err);
//       }

//       // Start the meeting automatically
//       onClickStartMeeting();
//       setIsMeetingStarted(true);
//     } else {
//       toast(`${err}`, {
//         position: "bottom-left",
//         autoClose: 4000,
//         hideProgressBar: true,
//         closeButton: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   }, [_handleOnCreateMeeting, participantName, onClickStartMeeting]);

//   useEffect(() => {
//     createAndStartMeeting();
//   }, [createAndStartMeeting]);

//   return (
//     <div
//       className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
//     >
//       {isMeetingStarted ? (
//         <div className="border border-solid border-gray-400 rounded-xl px-4 py-3 flex items-center justify-center">
//           <p className="text-white text-base">{`Meeting code : ${meetingId}`}</p>
//           <button
//             className="ml-2"
//             onClick={() => {
//               navigator.clipboard.writeText(meetingId);
//               setIsCopied(true);
//               setTimeout(() => {
//                 setIsCopied(false);
//               }, 3000);
//             }}
//           >
//             {isCopied ? (
//               <CheckIcon className="h-5 w-5 text-green-400" />
//             ) : (
//               <ClipboardIcon className="h-5 w-5 text-white" />
//             )}
//           </button>
//         </div>
//       ) : (
//         <p className="text-white text-base text-center">
//           Starting the meeting...
//         </p>
//       )}
//     </div>
//   );
// }

// import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export function MeetingDetailsScreen({
//   _handleOnCreateMeeting,
//   participantName,
//   onClickStartMeeting,
// }) {
//   const [meetingId, setMeetingId] = useState("");
//   const [isCopied, setIsCopied] = useState(false);
//   const [isMeetingStarted, setIsMeetingStarted] = useState(false);
//   const isMeetingCreationInProgress = useRef(false); // Prevents multiple meeting creations

//   const createAndStartMeeting = useCallback(async () => {
//     if (isMeetingCreationInProgress.current) return;  // Exit if meeting creation is in progress

//     isMeetingCreationInProgress.current = true;  // Mark that meeting creation is in progress

//     const { meetingId, err } = await _handleOnCreateMeeting({
//       participantName,
//     });

//     if (meetingId) {
//       setMeetingId(meetingId);

//       try {
//         // Send the meetingId and doctor's name to your database
//         await axios.post(
//           "http://localhost:8800/api/meeting/save_meeting",
//           {
//             meetingId: meetingId,
//             doctorName: participantName || "Unknown Doctor", // Ensure doctorName is not empty
//             doctorId: "66cfa30d2fbc2df367dbb2e2",
//             userId: "66cf2733590659a9923d0620",
//             isStarted: "true",
//           },
//           {
//             withCredentials: true,
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//           }
//         );
//       } catch (err) {
//         console.log(err);
//       }

//       // Start the meeting automatically
//       onClickStartMeeting();
//       setIsMeetingStarted(true);
//     } else {
//       toast(`${err}`, {
//         position: "bottom-left",
//         autoClose: 4000,
//         hideProgressBar: true,
//         closeButton: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   }, [_handleOnCreateMeeting, participantName, onClickStartMeeting]);

//   useEffect(() => {
//     if (!isMeetingCreationInProgress.current) {
//       createAndStartMeeting();
//     }
//   }, [createAndStartMeeting]);

//   return (
//     <div
//       className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
//     >
//       {isMeetingStarted ? (
//         <div className="border border-solid border-gray-400 rounded-xl px-4 py-3 flex items-center justify-center">
//           <p className="text-white text-base">{`Meeting code : ${meetingId}`}</p>
//           <button
//             className="ml-2"
//             onClick={() => {
//               navigator.clipboard.writeText(meetingId);
//               setIsCopied(true);
//               setTimeout(() => {
//                 setIsCopied(false);
//               }, 3000);
//             }}
//           >
//             {isCopied ? (
//               <CheckIcon className="h-5 w-5 text-green-400" />
//             ) : (
//               <ClipboardIcon className="h-5 w-5 text-white" />
//             )}
//           </button>
//         </div>
//       ) : (
//         <p className="text-white text-base text-center">
//           Starting the meeting...
//         </p>
//       )}
//     </div>
//   );
// }

import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  onClickStartMeeting,
}) {
  const [meetingId, setMeetingId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  const isMeetingCreationInProgress = useRef(false); // Prevents multiple meeting creations

  // Retrieve user information from local storage
  const rolee = localStorage.getItem("role");
  const namee = localStorage.getItem("user");
  const user = {
    role: rolee,
    name: namee,
    userId: "66cf2733590659a9923d0620",
    doctorId: "66cfa30d2fbc2df367dbb2e2",
  };
  const { role, name } = user;

  // Function to create and start the meeting (for doctors)
  const createAndStartMeeting = useCallback(async () => {
    if (isMeetingCreationInProgress.current) return; // Exit if meeting creation is in progress

    isMeetingCreationInProgress.current = true; // Mark that meeting creation is in progress

    const { meetingId, err } = await _handleOnCreateMeeting({
      participantName: name, // Use the doctor's name from local storage
    });

    if (meetingId) {
      setMeetingId(meetingId);

      try {
        // Send the meetingId and doctor's name to your database
        await axios.post(
          "http://localhost:8800/api/meeting/save_meeting",
          {
            meetingId: meetingId,
            doctorName: name || "Unknown Doctor", // Ensure doctorName is not empty
            doctorId: user.doctorId || "default-doctor-id",
            userId: user.userId || "default-user-id",
            isStarted: "true",
          },
          {
            withCredentials: true,
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      } catch (err) {
        console.log(err);
      }

      // Start the meeting automatically
      onClickStartMeeting();
      setIsMeetingStarted(true);
    } else {
      toast(`${err}`, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [_handleOnCreateMeeting, name, onClickStartMeeting]);

  // Function to join the meeting (for clients)
  const joinMeeting = useCallback(async () => {
    try {
      console.log("reaches!", user.userId);
      // Assuming you get the meeting ID from the backend or from an external source
      const response = await axios.get(
        "http://localhost:8800/api/meeting/get_meeting",
        {
          params: {
            userId: user.userId,
          },
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { meetingId } = response.data;
      console.log("the meeting id : ", meetingId);
      if (meetingId) {
        setMeetingId(meetingId);
        if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
          console.log("i am seeing meetin ID ",meetingId)
          onClickJoin(meetingId);
        } else setMeetingIdError(true);
     //   onClickStartMeeting(); // Automatically enter the meeting
     //   setIsMeetingStarted(true);
      }
    } catch (err) {
      console.log(err);
      toast("Failed to join the meeting.", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [user.userId, onClickStartMeeting]);

  // Check the role and execute the appropriate function
  useEffect(() => {
    if (role === "doctor") {
      createAndStartMeeting();
    } else if (role === "client"){
      joinMeeting();
    }
  }, [createAndStartMeeting, joinMeeting, role]);

  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {isMeetingStarted ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3 flex items-center justify-center">
          <p className="text-white text-base">{`Meeting code : ${meetingId}`}</p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingId);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      ) : (
        <p className="text-white text-base text-center">
          {role === "doctor"
            ? "Creating the meeting..."
            : "Joining the meeting..."}
        </p>
      )}
    </div>
  );
}
