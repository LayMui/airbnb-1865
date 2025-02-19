class CreateBookingService
    def self.call(listing, user_id, start_date, end_date, number_of_guests)
        # Use advisory lock to prevent concurrent bookings for same listing/dates
        lock_key = "booking_lock_#{listing.id}"
        
        ApplicationRecord.transaction do
            # Obtain advisory lock
            ApplicationRecord.connection.execute("SELECT pg_advisory_xact_lock(#{lock_key.hash})")
            
            # Check for overlapping bookings
            overlapping_bookings = listing.bookings.where(
                "start_date <= ? AND end_date >= ?", 
                end_date, start_date
            )
            
            if overlapping_bookings.exists?
                raise ActiveRecord::RecordInvalid
            end
            
            # Create the booking if no overlaps
            booking = listing.bookings.new(
                user_id: user_id,
                start_date: start_date,
                end_date: end_date,
                number_of_guests: number_of_guests
            )
            
            booking.save
            
            booking
        end
    end
end