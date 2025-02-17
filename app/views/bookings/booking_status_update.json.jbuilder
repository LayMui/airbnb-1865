json.updated_status render(partial: "hostings/confirmation_status", formats: :html, locals: {booking: @booking})

# json.inserted_item render(partial: "monuments/monument", formats: :html, locals: {monument: @monument})

# if @monument.persisted?
#   json.form render(partial: "monuments/form", formats: :html, locals: {monument: Monument.new})
#   json.inserted_item render(partial: "monuments/monument", formats: :html, locals: {monument: @monument})
# else
#   json.form render(partial: "monuments/form", formats: :html, locals: {monument: @monument})
# end
