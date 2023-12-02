//creating a Room details

export const CreateRoom = (req, res) => {
  try {
    return res.status(200).json({ message: req.body });
  } catch (error) {
    return res.status(500).json({ message: "interner server error", error });
  }
};

//BookedRooms
const BookedData = [
  {
    CustomerName: "Tamil",
    BookDate: "04.11.2023",
    StartTime: "7AM",
    EndTime: "9PM",
    RoomName: "A101",
    BookingStatus: "Booked",
    RoomId: 1,
  },
  {
    CustomerName: "Selvan",
    BookDate: "05.11.2023",
    StartTime: "5AM",
    EndTime: "9PM",
    RoomName: "A101",
  },
  {
    CustomerName: "selvan",
    BookDate: "05.11.2023",
    StartTime: "4PM",
    EndTime: "8PM",
    RoomName: "A101",
  },
  {
    CustomerName: "selvan",
    BookDate: "05.11.2023",
    StartTime: "8PM",
    EndTime: "12PM",
    RoomName: "A101",
  },
];

//To Book a new room

export const BookARoom = async (req, res) => {
  try {
    const BookingDetails = await req.body;

    const { BookDate, StartTime, EndTime } = BookingDetails;

    const count = 0;

    BookedData.map((hallObJ) => {
      if (hallObJ.BookDate == BookDate && hallObJ.StartTime == StartTime) {
        count++;
      }
    });

    if (count == 0) {
      BookingDetails.RoomId = BookedData.length + 1;
      BookingDetails.BookedStatus = "Booked";
      BookedData.push(BookingDetails);

      return res.status(200).json({
        message: "Room booked",
        Room: {
          CustomerName: BookingDetails.CustomerName,
          BookDate: BookingDetails.BookDate,
          StartTime: BookingDetails.StartTime,
          EndTime: BookingDetails.EndTime,
          RoomName: BookingDetails.RoomName,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Sorry___ Room Already booked" });
  }
};

export const BookedRooms = async (req, res) => {
  try {
    if (BookedData.length == 0) {
      res.status(200).json({ message: "No rooms booked" });
    } else {
      res.status(200).json(BookedData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "error while  checking the hall" });
  }
};

//All booked customers details

export const BookedCustomers = async (req, res) => {
  try {
    if (BookedData.length == 0) {
      res.status(200).json({ message: "No rooms booked" });
    } else {
      const BookedCustomers = BookedData.map((data) => {
        const { CustomerName, RoomName, BookDate, StartTime, EndTime } = data;

        return {
          CustomerName: CustomerName,
          RoomName: RoomName,
          BookDate: BookDate,
          StartTime: StartTime,
          EndTime: EndTime,
        };
      });
      res.status(200).json(BookedCustomers);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "error while  checking the Booked customers" });
  }
};

//To check how many times a customer booked rooms

export const FindCustomerDetails = async (req, res) => {
  try {
    const BookingDetails = req.body;

    const { CustomerName } = BookingDetails;

    let count = 0;
    const CustomerDetails = [];

    BookedData.map((hallObJ) => {
      if (hallObJ.CustomerName == CustomerName) {
        CustomerDetails.push(hallObJ);

        count++;
      }
    });

    if (count == 0) {
      return res.status(200).json({
        message: "Customer name not found",
      });
    } else if (count > 1) {
      return res
        .status(200)
        .json({ CustomerCount: count, message: CustomerDetails });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "error in finding customer details" });
  }
};
